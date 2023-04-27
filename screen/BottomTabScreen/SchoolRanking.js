import {FlatList, StyleSheet, View, ActivityIndicator, Text,} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { getRankRequest, getRankSuccess, getRankFailure, getSchoolBannerRequest, getSchoolBannerSuccess, getSchoolBannerFailure } from "../../core/reducers/schoolReducer";

import { Colors } from "../../constant/Colors";
import {getSchoolRanking,} from "../../BackEnd/controllers/classement";
import { getBannerData } from "../../BackEnd/controllers/school";
import SchoolBanner from "../../component/SchoolBanner";
import MessageContainer from "../../component/MessageContainer";
import { HeaderButton } from "../../component/TopBar";
import { alertProvider } from "../../BackEnd/errorHandler";
import { useSelector, useDispatch } from "react-redux";
import { storeRankingAbsoluteIndex } from "../../core/reducers/swipeReducer";
import store from "../../core";


function SchoolRanking({ navigation, route }) {
  const schoolReducer = useSelector((state) => state.schoolReducer);
  const swipeReducer = useSelector((state) => state.swipeReducer);


  // todo : virer le componentToShow du useEffect, direct dans le return sous condition if
  
  // const [previousAbsoluteIndex, setPreviousAbsoluteIndex] = useState(-1);
  const [readyToDisplayRank, setReadyToDisplayRank] = useState(false);
  const [componentToShow, setComponentToShow] = useState();
  const dispatch = useDispatch();

  
  // function loginScreenNavigation() {
  //   navigation.navigate("Login Screen");
  // }

  
  async function loadSchoolRank() {
    setReadyToDisplayRank(false);
    console.log("je passe dans loadSchoolRank ---------------------------------------------------");
    dispatch(getRankRequest());
    const data = await getSchoolRanking();
    console.log("[LOADSCHOOLRANK]", data.sortedSchoolList)
    if (data?.sortedSchoolList){
      dispatch(getRankSuccess(data.sortedSchoolList));
    } else if (data?.message) {
      dispatch(getRankSuccess(data.message));
    } else if (data?.error) {
      alertProvider(data.error);
      dispatch(getRankFailure());
    } else {
      alertProvider();
      dispatch(getRankFailure());
    }
  }

  useEffect(() => {
    //todo: appeler loadSchoolRank que lorsque necessaire
    // 'focus' quand on atteri sur le screen; 'blur' quand on quitte
    const unsubscribe = navigation.addListener("focus", () => {

      currentAbsoluteIndex = Object.keys(store.getState().swipeReducer.swipeTypeObj).length;
      // const previousAbsoluteIndex = swipeReducer.rankingAbsoluteIndex;
      const previousAbsoluteIndex = store.getState().swipeReducer.rankingAbsoluteIndex;
      console.log("======================================")
      console.log("[currentAbsoluteIndex]", currentAbsoluteIndex);
      console.log("[swipetypeObj]", swipeReducer.swipeTypeObj);
      console.log("[previousabsoluteindex]", previousAbsoluteIndex);
      if (previousAbsoluteIndex!==currentAbsoluteIndex){
        dispatch(storeRankingAbsoluteIndex(currentAbsoluteIndex));
        console.log("[previousAbsoluteIndex]",previousAbsoluteIndex);
        loadSchoolRank(); 
        // setPreviousAbsoluteIndex(currentAbsoluteIndex);     // !!! foctionne pas, reste null quand on revient sur le screen classement, ne se set pas
      }
    });
    return unsubscribe;
  }, [navigation]);


  async function loadMissingSchoolData(missingSchoolId) {
    dispatch(getSchoolBannerRequest())
    const data = await getBannerData(missingSchoolId);
    if (!data.error) {
      dispatch(getSchoolBannerSuccess(data));
      setReadyToDisplayRank(true);
    } else {
      dispatch(getSchoolBannerFailure());
      alertProvider();
    }
  }

  useEffect(()=> {
    const rankIdList = schoolReducer.rankIdList;
    if (Array.isArray(rankIdList)) {
      const schoolsData = schoolReducer.schoolsData;
      const notMissingSchoolId = Object.keys(schoolsData);
      const missingSchoolId = rankIdList.filter((item)=>!notMissingSchoolId.includes(item))
      missingSchoolId.length>0 ? loadMissingSchoolData(missingSchoolId) : setReadyToDisplayRank(true);
    } else {
      setReadyToDisplayRank(true);
    }
  }, [schoolReducer.rankIdList])



  useEffect(() => {
    if (readyToDisplayRank) {
      // const rankIdList = schoolReducer.rankIdList;
      
      if (Array.isArray(schoolReducer.rankIdList)) {
        setComponentToShow(
          <FlatList
            data={schoolReducer.rankIdList}
            // extraData={} 
            keyExtractor={(item) => item}
            renderItem={({item}) => {
              return (<SchoolBanner schoolId={item} />);
            }}
          />
        );
      } else {
        setComponentToShow(
          <MessageContainer>{schoolReducer.rankIdList}</MessageContainer>
        );
      }
    } else {
      setComponentToShow(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"} }>
          <ActivityIndicator size="large" color={Colors.orange500} />
        </View>
      );
    }
  }, [readyToDisplayRank]);

  

  function onSettingsPress() {
    navigation.navigate("Settings");
  }

  useLayoutEffect(() => {
    // créer les boutons du header
    navigation.setOptions({
      headerRight: () => <HeaderButton onSettingsPress={onSettingsPress} />,
    });
  }, [navigation]);



  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>{componentToShow}</View>
    </View>
  );
  // <View style={styles.podiumContainer}></View>; // contener bleu à rajouter avant flatList
}

export default SchoolRanking;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    mainContainerColor: Colors.backgroundColor,
    alignItems: "center",
    // padding: 10,
  },
  // rankContainer: {
  //   flex: 1,
  //   width: "90%",
  //   alignItems: "center",
  //   backgroundColor: Colors.blue400,
  // },

  listContainer: {
    alignItems: "center",
    flex: 1,
    // borderWidth: 1,
    width: "90%",
    // padding: 5,
  },

  // },
});
