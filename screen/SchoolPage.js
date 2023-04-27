import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
// import EStyleSheet from "react-native-extended-stylesheet";    // fonctionne pas

import PrimaryButton from "../component/PrimaryButton";
import { Colors } from "../constant/Colors";
import BlueContainer from "../component/BlueContainer";
import SecondaryHeader from "../component/secondaryHeader";
// import ScoreBar from "../component/ScoreBar";
// import ScorePerTheme from "../component/ScorePerTheme";


import { useState, useEffect } from "react";
import { modifyLike } from "../BackEnd/controllers/school";
import SCEIComponent from "../component/schoolPageComponent/SCEIComponent";
import MainNumberComponent from "../component/schoolPageComponent/MainNumberComponent";
import OptionComponent from "../component/schoolPageComponent/OptionComponent";
import ProfessionalOpportunities from "../component/schoolPageComponent/ProfessionalOpportunities";
import { useSelector, useDispatch } from "react-redux";
import {setSchoolLikeFailure, setSchoolLikeSuccess, getSchoolPageRequest, getSchoolPageSuccess, getSchoolPageFailure, } from "../core/reducers/schoolReducer";
import { getPageData } from "../BackEnd/controllers/school";

export default function SchoolPage({ navigation, route }) {
  const schoolId = route.params.schoolId;
  const singleSchoolData = useSelector((state) => state.schoolReducer.schoolsData[schoolId]);
  const [readyToDisplay, setReadyToDisplay] = useState(false);
  
  // console.log(singleSchoolData);
  // const id = singleSchoolData.id;
  const previousScreen = route.params.previousScreen;
  console.log(previousScreen);
  const dispatch = useDispatch();


  // ---------------------data écoles --------------------------------------

  async function getMissingData() {
    dispatch(getSchoolPageRequest());
    console.log("[schoolId]", schoolId);
    const data = await getPageData(schoolId);
    if (!data.error) {
      dispatch(getSchoolPageSuccess({schoolId, data}));
    } else {
      dispatch(getSchoolPageFailure());
      alertProvider();
    }
    
  }

  useEffect(()=> {
    if (!singleSchoolData.ville) {
      getMissingData();
    }
  }, [])

  useEffect(()=> {
    console.log(singleSchoolData);
    if (singleSchoolData.ville) {
      setReadyToDisplay(true);
    }
  }, [singleSchoolData])

  // --------------------------------------------------------------------------


  // --------------- like ecole -------------------------------------
  
  async function handleLikePress() {
    const newLike = !singleSchoolData.like;
    dispatch(setSchoolLikeSuccess({schoolId, newLike}));
    const success = await modifyLike(schoolId, newLike);
    if (!success) {
      dispatch(setSchoolLikeFailure({schoolId, newLike}));
      alertProvider("Un problème est survenu... Le like n'a pas été pris en compte.");
    }

  }
  // --------------- fin like ecole -------------------------------------

  if (readyToDisplay) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <PrimaryButton
            onPress={() => {
              console.log("je quitte schoolPage -----------------------------------");
              navigation.navigate(previousScreen);
            }}
            name="arrow-back"
            size={28}
            color={Colors.orange500}
          />
          <PrimaryButton
            onPress={handleLikePress}
            name={singleSchoolData.like ? "heart" : "heart-outline"}
            size={30}
            color={Colors.orange500}
          />
        </View>
  
        <ScrollView
          style={styles.bodyContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* <View style={styles.bodyContainer} showsVerticalScrollIndicator={false}> */}
  
          <View style={styles.imageContainer} />
          <View style={styles.schoolHeadInfo}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.rankContainer}>
                <Text
                  style={{
                    color: Colors.grey,
                    fontWeight: "500",
                    fontSize: 14,
                    textAlign: "center",
                    marginTop: -2,
                  }}
                >
                  {singleSchoolData.rank}
                </Text>
              </View>
  
              <Text
                style={{ fontSize: 20, fontWeight: "500", color: Colors.grey }}
              >
                {singleSchoolData.nomEcole}
              </Text>
            </View>
            <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.grey }}>
              {singleSchoolData.typeFormation}
            </Text>
          </View>
  
          <View style={styles.ContestAndLocation}>
            <BlueContainer
              // text={singleSchoolData.concours}
              text="--x--"
              name="newspaper-sharp"
            />
            <BlueContainer text={singleSchoolData.ville} name="location-sharp" />
          </View>
  
          <SCEIComponent
            parcoursChoix={singleSchoolData.parcoursChoix}
            admission={singleSchoolData.admission}
          />
  
          <MainNumberComponent
            moyenneBac={singleSchoolData.moyenneBac}
            salaireMoyen={singleSchoolData.salaireMoyen}
            fraisScolarite={singleSchoolData.fraisScolarite}
          />
  
          <SecondaryHeader>Les options de formation</SecondaryHeader>
          <OptionComponent
            singleSchoolData={singleSchoolData}
            optionSynthese={singleSchoolData.optionSynthese}
            optionDetail={singleSchoolData.optionDetail}
          />
  
          <SecondaryHeader>Les débouchés</SecondaryHeader>
          <ProfessionalOpportunities
            secteurDebouche={singleSchoolData.secteurDebouche}
          />
  
          {/* <SecondaryHeader>Score global</SecondaryHeader>
          <ScoreBar
            score={singleSchoolData.globalSchoolGrade}
            mainBarColor={Colors.orange100}
            progressBarColor={Colors.orange500}
            globalScore={true}
          />
          <SecondaryHeader>Score par thème</SecondaryHeader>
          <View style={styles.scoreDetailRow}>
            <ScorePerTheme
              themeName="Formation"
              themeColor={"#70ddfe33"}
              score={singleSchoolData.detailSchoolGrade.theme1}
            />
            <ScorePerTheme
              themeName="Campus"
              themeColor={"#7eef9d33"}
              score={singleSchoolData.detailSchoolGrade.theme2}
            />
            <ScorePerTheme
              themeName="Extrascolaire"
              themeColor={"#ff80d533"} 
              score={singleSchoolData.detailSchoolGrade.theme4}
            />
          </View>
          <View style={styles.scoreDetailRow}>
            <ScorePerTheme
              themeName="Excellence"
              themeColor={"#e4333333"}
              score={singleSchoolData.detailSchoolGrade.theme3}
            />
            <ScorePerTheme
              themeName="Argent"
              themeColor={"#ead72533"}
              score={singleSchoolData.detailSchoolGrade.theme5}
            />
            <ScorePerTheme
              themeName="Valeurs"
              themeColor={"#d766fe33"}
              score={singleSchoolData.detailSchoolGrade.theme6}
            />
          </View> */}
        </ScrollView>
        {/* </View> */}
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"} }>
        <ActivityIndicator size="large" color={Colors.orange500} />
      </View>
    );
  }

  
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
