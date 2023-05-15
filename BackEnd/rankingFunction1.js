//---------------------------------------- Fonction primaire --------------------------------------------//
// Calculer et retourner une liste d'id triés avec le rang pour chaque ecole

// paramètres cards et schools à récupérer via rankingData
// swipe est un object tenu à jour localement => {answeredList : ["ingeCard1", "ingeCard2"],
//                                                swipeObj : {ingeCard1 : "like", ingeCard2 : "dislike"},
//                                                answerByTheme : {theme1 : 2, theme2: 5}}
// minSwipeForRanking envoyé via splashData
export function generateRankin(swipe, cards, schools, minSwipeForRanking, themeDetail, swipeSettings) {
    try {
        if (swipe.answeredList.length>=minSwipeForRanking) {  // Si l'utilisateur a swipé un certain nb de proposition
            // Récupérer les écoles
            let schoolIdList = [];
            schoolIdList = schools.map((school)=>{
                return school._id;
            });
            // Récupérer les cartes
            let cardObj = {};
            cards.forEach((card)=>{
                cardObj[card._id] = card;
            });
            const schoolGroupObj = createSchoolGroupObj(schoolIdList, cardObj, swipe.swipeObj); // Créer l'objet ecole / groupe
            //---------------------------------------------------------------------------//
            // Calculer la note pour les écoles du classement
            const schoolRank = {};
            schoolRank.rankObj = {};  // reset les rangs
            let schoolGradeObj = {};  // Initialiser l'object notes
            const nbAnswer = swipe.answeredList.length;
            for (let schoolId of schoolIdList) {
                if (!Object.values(schoolGroupObj[schoolId]).includes(0)) {  // Si l'école est concernée par le nouveau classement
                    schoolGradeObj[schoolId] = 0;  // Initialiser la note à 0
                    // Calcul de la note
                    for (let idCard of swipe.answeredList) {
                        let weight = 0;
                        if (cardObj[idCard].schoolList.includes(schoolId)) {
                            const themeWeight = themeDetail[cardObj[idCard].idTheme].themeWeight;
                            weight = themeWeight * swipe.answerByTheme[cardObj[idCard].idTheme] / nbAnswer;
                        }
    
                        const swipeType = swipe.swipeObj[idCard];
                        const swipeBonus = swipeSettings[swipeType];
                        schoolGradeObj[schoolId] += weight * swipeBonus.bonus;
                    }
                }
            }
            //---------------------------------------------------------------------------//
            // Calculer le rang pour chaque école et créer l'objet ecole
            const sortedSchoolGradeList = createSchoolGradeList(schoolGradeObj);
            if (sortedSchoolGradeList) {
                let rank = 1;
                let sortedSchool = [];
                let previousSchoolGrade = 0;
                for (let schoolGradeList of sortedSchoolGradeList) {
                    const schoolId = schoolGradeList[0];
                    let grade = schoolGradeList[1];
                    grade = Math.round(grade);
                    // Si la note est positive, on prend en compte l'école dans le classement
                    // Détermination du rang de l'école en fonction de sa note
                    if (previousSchoolGrade > grade) {
                        rank += 1;
                    }
                    previousSchoolGrade = grade;
                    schoolRank.rankObj[schoolId] = rank;
                    // ajout des notes et du rang pour chaque école
                    const newEcole = {
                        id: schoolId,
                        rank: schoolRank.rankObj[schoolId],
                    }
                    // Ajout de l'école à la liste triée
                    sortedSchool.push({...newEcole});
                }
                //---------------------------------------------------------------------------//
                return {sortedSchoolList: sortedSchool};
            } else {
                throw "Impossible d'accéder au classement des écoles";
            }
        } else {
            return {message : "Continue de swiper pour voir apparaitre ton premier classement"};
        }
    } catch(error) {
        console.log("[generateRANKING ERROR]", error);
        return {error}
    }
    
}

//---------------------------------------- Fonctions secondaires --------------------------------------------//
// Appelé dans generateRanking. Crée l'objet ecole/groupe permettant de disqualifier certaines écoles pour le classement
function createSchoolGroupObj(schoolIdList, cardObj, swipe) {
    // Créer la liste des compteurs de propositions par idGroupe
    let groupLength = {};
    const cardIdList = Object.keys(cardObj);
    for (let idCard of cardIdList) {
        const card = cardObj[idCard];
        const idGroupe = card.idGroupe;
        if (card.idGroupe !== "nc") {
            if (!groupLength[idGroupe]) {
                groupLength[idGroupe] = 1;
            } else {
                groupLength[idGroupe] = groupLength[idGroupe] + 1;
            }
        }
    }
    // Déclarer et remplir l'object ecole / groupe
    const groupLengthKeys = Object.keys(groupLength);
    // Initialisation de schoolGroupObj pour chaque école et chaque groupe
    let schoolGroupObj = {};
    schoolIdList.map((schoolId) => {
        schoolGroupObj[schoolId] = {};
        groupLengthKeys.map((groupId) => {
            if (groupLengthKeys[groupId]>1) {  // Si le groupe comporte plus d'une proposition
                schoolGroupObj[schoolId][groupId] = 0;  // Par défaut on supprime l'école
            } else {
                schoolGroupObj[schoolId][groupId] = 1;  // Sinon on garde l'école par défault
            }
        })
    })
    // Remplassement par 0 ou 1 suivant le cas
    for (let idCard of cardIdList) {
        const idGroupe = cardObj[idCard].idGroupe;
        if (idGroupe!=="nc") {  // si la proposition a un groupe
            let cardSchoolList = cardObj[idCard].schoolList;
            cardSchoolList.map((schoolId) => {
                if (groupLength[idGroupe] === 1 && swipe[idCard] === "dislike") { // Si le groupe est constitué d'une seule prop et que la proposition est disliké
                    schoolGroupObj[schoolId][idGroupe] = 0; // On supprime l'école
                } else if (groupLength[idGroupe] > 1 && swipe[idCard] !== "dislike") {  // Si le groupe contient plusieurs propositions Et qu'une proposition n'est pas disliké
                    schoolGroupObj[schoolId][idGroupe] = 1;  // On garde l'école
                }
            })
        }

    }
    return schoolGroupObj
}

// Appelé dans generateRanking. Renvoie une liste triée d'école en fonction de leur rang
function createSchoolGradeList(schoolGradeObj) {
    // Transformer l'objet en une liste contenant des éléments de type [clé, valeur]
    let schoolIdList = Object.keys(schoolGradeObj);
    let schoolGradeList = schoolIdList.map(function(schoolId) {
        return [schoolId, schoolGradeObj[schoolId]];
    });
    schoolGradeList.sort(function(firstElem, secondElem) {
        return secondElem[1] - firstElem[1];
    });
    return(schoolGradeList);
}
