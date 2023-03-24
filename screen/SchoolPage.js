import { View, StyleSheet, Text, ScrollView } from "react-native";
// import EStyleSheet from "react-native-extended-stylesheet";    // fonctionne pas

import PrimaryButton from "../component/PrimaryButton";
import { Colors } from "../constant/Colors";
import BlueContainer from "../component/BlueContainer";
import SecondaryHeader from "../component/secondaryHeader";
// import ScoreBar from "../component/ScoreBar";
// import ScorePerTheme from "../component/ScorePerTheme";
import { useState, useEffect } from "react";
import { onSchoolLike, getLikeValue } from "../BackEnd/controllers/classement";
import SCEIComponent from "../component/schoolPageComponent/SCEIComponent";
import MainNumberComponent from "../component/schoolPageComponent/MainNumberComponent";
import OptionComponent from "../component/schoolPageComponent/OptionComponent";
import ProfessionalOpportunities from "../component/schoolPageComponent/ProfessionalOpportunities";
// import { isSchoolLikedBack } from "../../BackEnd/controllers/classement";

export default function SchoolPage({ navigation, route }) {
  const schoolPressedData = route.params.schoolPressedData;   
  console.log(schoolPressedData)  ;
  const id = schoolPressedData.id;

  // --------------------------------------------------------------------------

  // const [schoolPressedData, setSchoolPressedData] = useState();
  const [isSchoolLiked, setIsSchoolLiked] = useState();
  const [initialLike, setInitialLike] = useState();
  // const [isScreenReady, setIsScreenReady] = useState(false);

  async function askLikeStatus() {
    console.log("je passe dans le focus schoolPage");
    // const likeValue = await getLikeValue(id);
    // console.log(likeValue);
    setInitialLike(schoolPressedData.like);
    setIsSchoolLiked(schoolPressedData.like);
  }
  

  useEffect(() => {
    const loadOnFocus = navigation.addListener('focus', () => {
      askLikeStatus();   
    // const data = route.params.schoolPressedData;
    // setIsSchoolLiked(data.like);
    // setSchoolPressedData(data);
    // const id = schoolPressedData.id;
    });
    return loadOnFocus;
  }, [navigation]);

  
  
  async function handleLikePress() {
    const like = isSchoolLiked;
    console.log(!like);
    setIsSchoolLiked((bool) => !bool);
    const likeSuccess = await onSchoolLike(id, !like);
    schoolPressedData.like = !like;
       

  };
  

  return (
    <View style={styles.mainContainer}>

      <View style={styles.headerContainer}>
        <PrimaryButton
          onPress={() => {
            console.log("je quitte schoolPage -----------------------------------");
            if(initialLike === schoolPressedData.like) return navigation.navigate("SchoolRanking");
            navigation.navigate("SchoolRanking", {school : schoolPressedData});
          }}
          name="arrow-back"
          size={28}
          color={Colors.orange500}
        />
        <PrimaryButton
          onPress={handleLikePress}
          name={isSchoolLiked ? "heart" : "heart-outline"}
          size={30}
          color={Colors.orange500}
        />
      </View>


      <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
      {/* <View style={styles.bodyContainer} showsVerticalScrollIndicator={false}> */}

        <View style={styles.imageContainer} />
        <View style={styles.schoolHeadInfo}>
          <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center",}}>
            <View style={styles.rankContainer}>
              <Text
                style={{ color: Colors.grey, fontWeight: "500", fontSize: 14, textAlign: "center", marginTop: -2, }}
              >
                {schoolPressedData.rank}
              </Text>
            </View>

            <Text
              style={{ fontSize: 20, fontWeight: "500", color: Colors.grey }}
            >
              {schoolPressedData.nomEcole}
            </Text>
          </View>
          <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.grey }}>
            {schoolPressedData.typeFormation}
          </Text>
        </View>


        <View style={styles.ContestAndLocation}>
          <BlueContainer text={schoolPressedData.concours} name="newspaper-sharp" />
          <BlueContainer text={schoolPressedData.ville} name="location-sharp" />
        </View>

        <SCEIComponent
          parcoursChoix = {schoolPressedData.parcoursChoix}
          nombrePlace = {schoolPressedData.nombrePlace}
          rangMedian = {schoolPressedData.rangMedian}
          filiereList = {schoolPressedData.filiereList}
        />
        
        
        <MainNumberComponent 
          moyenneBac={schoolPressedData.moyenneBac} 
          salaireMoyen={schoolPressedData.salaireMoyen} 
          fraisScolarite={schoolPressedData.fraisScolarite}
        />


        <SecondaryHeader>Les options de formation</SecondaryHeader>
        <OptionComponent 
          schoolPressedData={schoolPressedData}
          optionSynthese={schoolPressedData.optionSynthese}
          optionDetail={schoolPressedData.optionDetail}
        />

        <SecondaryHeader>Les débouchés</SecondaryHeader>
        <ProfessionalOpportunities secteurDebouche={schoolPressedData.secteurDebouche}/>

        {/* <SecondaryHeader>Score global</SecondaryHeader>
        <ScoreBar
          score={schoolPressedData.globalSchoolGrade}
          mainBarColor={Colors.orange100}
          progressBarColor={Colors.orange500}
          globalScore={true}
        />
        <SecondaryHeader>Score par thème</SecondaryHeader>
        <View style={styles.scoreDetailRow}>
          <ScorePerTheme
            themeName="Formation"
            themeColor={"#70ddfe33"}
            score={schoolPressedData.detailSchoolGrade.theme1}
          />
          <ScorePerTheme
            themeName="Campus"
            themeColor={"#7eef9d33"}
            score={schoolPressedData.detailSchoolGrade.theme2}
          />
          <ScorePerTheme
            themeName="Extrascolaire"
            themeColor={"#ff80d533"} 
            score={schoolPressedData.detailSchoolGrade.theme4}
          />
        </View>
        <View style={styles.scoreDetailRow}>
          <ScorePerTheme
            themeName="Excellence"
            themeColor={"#e4333333"}
            score={schoolPressedData.detailSchoolGrade.theme3}
          />
          <ScorePerTheme
            themeName="Argent"
            themeColor={"#ead72533"}
            score={schoolPressedData.detailSchoolGrade.theme5}
          />
          <ScorePerTheme
            themeName="Valeurs"
            themeColor={"#d766fe33"}
            score={schoolPressedData.detailSchoolGrade.theme6}
          />
        </View> */}
      </ScrollView>
      {/* </View> */}
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    paddingHorizontal: "6%",
    // borderWidth: 1,
  },
 
  bodyContainer: {
    // flex: 1,
  },
  imageContainer: {
    height: 60,
    width: "100%",
    backgroundColor: Colors.orange100,
  },
  rankContainer: {
    marginRight: 5,
    padding: 1,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 20,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
  },
  schoolHeadInfo: {
    alignItems: "center",
    marginTop: 7,
  },
  ContestAndLocation: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 48,
    marginTop: 15,
  },

  
  
  mainNumbersContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  scoreDetailRow: {
    flexDirection: "row",
    height: "10%",
    alignSelf: "center",
  },
});

