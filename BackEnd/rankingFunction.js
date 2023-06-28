//---------------------------------------- Fonction primaire --------------------------------------------//
// Calculer et retourner une liste d'id triés avec le rang pour chaque ecole

// paramètres cards et schools à récupérer via rankingData
// swipe est un object tenu à jour localement => {answeredList : ["ingeCard1", "ingeCard2"],
//                                                swipeObj : {ingeCard1 : "like", ingeCard2 : "dislike"},
//                                                answerByTheme : {theme1 : 2, theme2: 5}}
// minSwipeForRanking envoyé via splashData
// Calculer et retourner une liste d'id triés avec le rang pour chaque ecole


import store from "../core";
import {getForRankingFailure, getForRankingRequest, getForRankingSuccess,  } from "../core/reducers/forRankingReducer";
import { calculNewRank, calculNewRankSuccess, calculNewRankFailure } from "../core/reducers/schoolReducer";
import { getRankingAlgoData } from "./controllers/ranking";
import { alertProvider } from "./errorHandler";
import { getBannerData } from "./controllers/school";
import { generateRanking } from "./rankingAlgo";



// function generateRanking(swipe, cards, schools, minSwipeForRanking, themeDetail, swipeSettings) {
//     try {
//         if (swipe.answeredList.length>=minSwipeForRanking) {  // Si l'utilisateur a swipé un certain nb de proposition
//             // Récupérer les écoles
//             let schoolIdList = [];
//             let schoolName = {};
//             schoolIdList = schools.map((school)=>{
//                 schoolName[school._id] = school.nomEcole;
//                 return school._id;
//             });
//             // Récupérer les cartes
//             let cardObj = {};
//             cards.forEach((card)=>{
//                 cardObj[card._id] = card;
//             });
//             const schoolGroupObj = createSchoolGroupObj(schoolIdList, cardObj, swipe.swipeObj); // Créer l'objet ecole / groupe
//             //---------------------------------------------------------------------------//
//             // Calculer la note pour les écoles du classement
//             const schoolRank = {};
//             schoolRank.rankObj = {};  // reset les rangs
//             let schoolGradeObj = {};  // Initialiser l'object notes
//             const nbAnswer = swipe.answeredList.length;
//             for (let schoolId of schoolIdList) {
//                 if (!Object.values(schoolGroupObj[schoolId]).includes(0)) {  // Si l'école est concernée par le nouveau classement
//                     schoolGradeObj[schoolId] = {};
//                     schoolGradeObj[schoolId].grade = 0;  // Initialiser la note à 0
//                     //schoolGradeObj[schoolId].schoolName = schoolName[schoolId];
//                     // Calcul de la note
//                     for (let idCard of swipe.answeredList) {
//                         let weight = 0;
//                         if (cardObj[idCard].schoolList.includes(schoolId)) {
//                             const themeWeight = themeDetail[cardObj[idCard].idTheme].themeWeight;
//                             weight = themeWeight * swipe.answerByTheme[cardObj[idCard].idTheme] / nbAnswer;
//                         }
    
//                         const swipeType = swipe.swipeObj[idCard];
//                         const swipeBonus = swipeSettings[swipeType];
//                         schoolGradeObj[schoolId].grade += weight * swipeBonus.bonus;
//                     }
//                 }
//             }
//             //---------------------------------------------------------------------------//
//             // Calculer le rang pour chaque école et créer l'objet ecole
//             const sortedSchoolGradeList = createSchoolGradeList(schoolGradeObj, schoolName);
//             if (sortedSchoolGradeList) {
//                 let rank = 1;
//                 let sortedSchool = [];
//                 let previousSchoolGrade = 0;
//                 for (let schoolGradeList of sortedSchoolGradeList) {
//                     //const schoolId = schoolGradeList.schoolName;
//                     const schoolId = schoolGradeList.id;
//                     let grade = schoolGradeList.grade;
//                     //grade = Math.round(grade);
//                     // Si la note est positive, on prend en compte l'école dans le classement
//                     // Détermination du rang de l'école en fonction de sa note
//                     if (previousSchoolGrade > grade) {
//                         rank += 1;
//                     }
//                     previousSchoolGrade = grade;
//                     schoolRank.rankObj[schoolId] = rank;
//                     // ajout des notes et du rang pour chaque école
//                     const newEcole = {
//                         id: schoolId,
//                         rank: schoolRank.rankObj[schoolId],
//                     }
//                     // Ajout de l'école à la liste triée
//                     sortedSchool.push({...newEcole});
//                 }
//                 //---------------------------------------------------------------------------//
//                 if (schoolRank.rankObj.empty && Object.keys(schoolRank.rankObj).length > 1) {
//                     delete schoolRank.rankObj.empty;
//                 }
//                 // return sortedSchool;
//                 return {rankSchoolList: sortedSchool};
//             } else {
//                 throw "Impossible d'accéder au classement des écoles";
//             }
//         } else {
//             return {message : "Continue de swiper pour voir apparaitre ton premier classement"};
//         }
//     } catch(error) {
//         console.log("[generateRANKING ERROR]", error);
//         return {error}
//     }
    
// }

// //---------------------------------------- Fonctions secondaires --------------------------------------------//
// // Appelé dans generateRanking. Crée l'objet ecole/groupe permettant de disqualifier certaines écoles pour le classement
// function createSchoolGroupObj(schoolIdList, cardObj, swipe) {
//     // Créer la liste des compteurs de propositions par idGroupe
//     let groupLength = {};
//     const cardIdList = Object.keys(cardObj);
//     for (let idCard of cardIdList) {
//         const card = cardObj[idCard];
//         const idGroupe = card.idGroupe;
//         if (card.idGroupe !== "nc") {
//             if (!groupLength[idGroupe]) {
//                 groupLength[idGroupe] = 1;
//             } else {
//                 groupLength[idGroupe] = groupLength[idGroupe] + 1;
//             }
//         }
//     }
//     // Déclarer et remplir l'object ecole / groupe
//     const groupLengthKeys = Object.keys(groupLength);
//     // Initialisation de schoolGroupObj pour chaque école et chaque groupe
//     let schoolGroupObj = {};
//     schoolIdList.map((schoolId) => {
//         schoolGroupObj[schoolId] = {};
//         groupLengthKeys.map((groupId) => {
//             if (groupLengthKeys[groupId]>1) {  // Si le groupe comporte plus d'une proposition
//                 schoolGroupObj[schoolId][groupId] = 0;  // Par défaut on supprime l'école
//             } else {
//                 schoolGroupObj[schoolId][groupId] = 1;  // Sinon on garde l'école par défault
//             }
//         })
//     })
//     // Remplassement par 0 ou 1 suivant le cas
//     for (let idCard of cardIdList) {
//         const idGroupe = cardObj[idCard].idGroupe;
//         if (idGroupe!=="nc") {  // si la proposition a un groupe
//             let cardSchoolList = cardObj[idCard].schoolList;
//             cardSchoolList.map((schoolId) => {
//                 if (groupLength[idGroupe] === 1 && swipe[idCard] === "dislike") { // Si le groupe est constitué d'une seule prop et que la proposition est disliké
//                     schoolGroupObj[schoolId][idGroupe] = 0; // On supprime l'école
//                 } else if (groupLength[idGroupe] > 1 && swipe[idCard] !== "dislike") {  // Si le groupe contient plusieurs propositions Et qu'une proposition n'est pas disliké
//                     schoolGroupObj[schoolId][idGroupe] = 1;  // On garde l'école
//                 }
//             })
//         }

//     }
//     return schoolGroupObj
// }

// //---------------------------------------- Fonctions secondaires --------------------------------------------//
// // Appelé dans generateRanking. Renvoie une liste triée d'école en fonction de leur rang
// function createSchoolGradeList(schoolGradeObj, schoolName) {
//     // Transformer l'objet en une liste contenant des éléments de type [clé, valeur]
//     const schoolIdList = Object.keys(schoolGradeObj);
//     let schoolGradeList = schoolIdList.map(function(schoolId) {
//         return { id: schoolId, grade: schoolGradeObj[schoolId].grade };
//     });
//     schoolGradeList.sort(function(firstElem, secondElem) {
//         if (secondElem.grade - firstElem.grade === 0) {
//             const firstSchoolName = schoolName[firstElem.id].toLowerCase();
//             const secondSchoolName = schoolName[secondElem.id].toLowerCase();
//             return firstSchoolName.localeCompare(secondSchoolName);
//         } else {
//             return secondElem.grade - firstElem.grade;
//         }
//     });
//     return(schoolGradeList);
// }







// =================== fonctions pour front (schoolRanking.js + explore.js) ========================================

export async function calculateNewRank(setReadyToDisplayRank, dispatch ) {
    (()=>setReadyToDisplayRank(false))();

    const {cards, schoolIdObj } = store.getState().forRankingReducer;
    // console.log("[schoolIdObj]", schoolIdObj)
    let doesCardsExist = cards instanceof Object;
    doesCardsExist ? doesCardsExist = Object.keys(cards)>0 : null;

    if (doesCardsExist) {                       // verif qu'on a les datas necessaires au calcul
      prepareAndCalcul(cards, schoolIdObj, setReadyToDisplayRank, dispatch);
    } else {
      dispatch(getForRankingRequest());
      const data = await getRankingAlgoData();
      if (data.success) {
        delete data.success;
        dispatch(getForRankingSuccess({cards: data.cards, schoolIdObj: data.schoolIdObj }));
        prepareAndCalcul(data.cards, data.schoolIdObj, setReadyToDisplayRank, dispatch);
      } else {
        dispatch(getForRankingFailure());
      }
    }
  }



function prepareAndCalcul(cards, schoolIdObj, setReadyToDisplayRank, dispatch) {
    console.log("je passe dans calcuuuuull -----------------");
    dispatch(calculNewRank());

    //preparer les datas pour generateRanking()
    const {swipeTypeObj, answerByTheme, minSwipeForRanking, swipeSettings} = store.getState().swipeReducer;
    const themeObj = store.getState().themeReducer.themeObj
    const swipe = {
      answeredList : Object.keys(swipeTypeObj), 
      swipeObj : swipeTypeObj,
      answerByTheme : answerByTheme 
    };
    
    const ranking = generateRanking(swipe, cards, schoolIdObj, minSwipeForRanking, themeObj, swipeSettings);
    console.log("[generateRanking ----------------]", ranking);


    if (ranking?.rankSchoolList){
      dispatch(calculNewRankSuccess({rankSchoolList: ranking.rankSchoolList}));
    //   let rankIdList = [];
      const rankIdList = ranking.rankSchoolList.map(item => item.id);
      loadMissingSchoolData(rankIdList, setReadyToDisplayRank, dispatch);
      // dispatch();
    } else if (ranking?.message) {
      dispatch(calculNewRankSuccess({message: ranking.message}));
      setReadyToDisplayRank(true);
    } else if (ranking?.error) {
      alertProvider(ranking?.error);
      dispatch(calculNewRankFailure(ranking.error));
      setReadyToDisplayRank(true);
      return;
    } else {
      alertProvider();
      dispatch(calculNewRankFailure("Une erreur est survenue lors du calcul du classement"));
      return;
    }

  }

export async function loadMissingSchoolData(rankIdList, setReadyToDisplayRank, dispatch) {
const schoolsData = store.getState().schoolReducer.schoolsData;
const notMissingSchoolId = Object.keys(schoolsData).filter((item)=> schoolsData[item].nomEcole);
// console.log("[notMissingSchoolId]", notMissingSchoolId);
const missingSchoolId = rankIdList.filter((item)=>!notMissingSchoolId.includes(item));
if (missingSchoolId.length>0) {
    // console.log("va t'il y avoir un beeuuuug mntn ?");
    // console.log("missingSchoolData", missingSchoolId);
    const data = await getBannerData(missingSchoolId, dispatch);
    if (data.success) {
    setReadyToDisplayRank(true);
    } else {
    alertProvider();
    }
} else {
    setReadyToDisplayRank(true);
}
}

