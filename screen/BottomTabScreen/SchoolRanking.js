import {FlatList, StyleSheet, View, ActivityIndicator, Text,} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { getRankRequest, getRankSuccess, getRankFailure, getSchoolBannerRequest, getSchoolBannerSuccess, getSchoolBannerFailure } from "../../core/reducers/schoolReducer";

import { Colors } from "../../constant/Colors";
import {getSchoolRanking, getRankingAlgoData} from "../../BackEnd/controllers/ranking";
import { generateRanking } from "../../BackEnd/rankingFunction";
import { getBannerData } from "../../BackEnd/controllers/school";
import SchoolBanner from "../../component/SchoolBanner";
import MessageContainer from "../../component/MessageContainer";
import { HeaderButton } from "../../component/TopBar";
import { alertProvider } from "../../BackEnd/errorHandler";
import { useSelector, useDispatch } from "react-redux";
import { storeRankingAbsoluteIndex } from "../../core/reducers/swipeReducer";
import store from "../../core";
import { getForRankingFailure, getForRankingRequest, getForRankingSuccess } from "../../core/reducers/forRankingReducer";


function SchoolRanking({ navigation, route }) {
  const schoolReducer = useSelector((state) => state.schoolReducer);
  const swipeReducer = useSelector((state) => state.swipeReducer);
  const themeObj = useSelector((state)=> state.themeReducer.themeObj)
  // const forRanking = useSelector(((state)=> state.forRankingReducer.))


  // todo : virer le componentToShow du useEffect, direct dans le return sous condition if
  
  // const [previousAbsoluteIndex, setPreviousAbsoluteIndex] = useState(-1);
  const [readyToDisplayRank, setReadyToDisplayRank] = useState(false);
  const [componentToShow, setComponentToShow] = useState();
  const dispatch = useDispatch();

  
  // function loginScreenNavigation() {
  //   navigation.navigate("Login Screen");
  // }

  // async function handleForRankingReducer() {
    

  // }


  // ---------- rank calcul -------------------------------------------
  function calculateNewRank(cards, schoolIdObj) {
    dispatch(getRankRequest());

    const swipe = {
      answeredList : Object.keys(swipeReducer.swipeTypeObj), 
      swipeObj : swipeReducer.swipeTypeObj,
      answerByTheme : swipeReducer.answerByTheme 
    };

    const ranking = generateRanking(swipe, cards, schoolIdObj, 
      swipeReducer.minSwipeForRanking, themeObj, 
      swipeReducer.swipeSettings);

      if (ranking?.sortedSchoolList){
        dispatch(getRankSuccess(ranking.sortedSchoolList));
      } else if (ranking?.message) {
        dispatch(getRankSuccess(ranking.message));
      } else if (ranking?.error) {
        alertProvider(ranking?.error);
        dispatch(getRankFailure(ranking.error));
      } else {
        alertProvider();
        dispatch(getRankFailure());
      }
  }

  
  async function loadSchoolRank() {
    setReadyToDisplayRank(false);
    const {cards, schoolIdObj } = store.getState().forRankingReducer;

    if (Object.keys(cards)>0) {
      calculateNewRank(cards, schoolIdObj);
    } else {

      dispatch(getForRankingRequest());
      const data = await getRankingAlgoData();
      if (data.success) {
        delete data.success;
        dispatch(getForRankingSuccess({cards: data.cards, schoolIdObj: data.schoolIdObj }));
        calculateNewRank(data.cards, data.schoolIdObj);
      } else {
        dispatch(getForRankingFailure());
      }
    }
  }
// ---------------------- fin calcul ----------------------------------------------------


  useEffect(() => {
    // 'focus' quand on atteri sur le screen; 'blur' quand on quitte
    const unsubscribe = navigation.addListener("focus", () => {

      currentAbsoluteIndex = Object.keys(store.getState().swipeReducer.swipeTypeObj).length;
      const previousAbsoluteIndex = store.getState().swipeReducer.rankingAbsoluteIndex;
      if (previousAbsoluteIndex!==currentAbsoluteIndex){
        dispatch(storeRankingAbsoluteIndex(currentAbsoluteIndex));
        console.log("[previousAbsoluteIndex]",previousAbsoluteIndex);
        loadSchoolRank(); 
        // setPreviousAbsoluteIndex(currentAbsoluteIndex);     // !!! foctionne pas, reste null quand on revient sur le screen classement, ne se set pas
      }
    });
    return unsubscribe;
  }, [navigation]);


  async function loadMissingSchoolData(rankIdList) {
    const schoolsData = store.getState().schoolReducer.schoolsData;
    const notMissingSchoolId = Object.keys(schoolsData);
    const missingSchoolId = rankIdList.filter((item)=>!notMissingSchoolId.includes(item));
    if (missingSchoolId.length>0) {
      const data = await getBannerData(missingSchoolId, dispatch);
      if (data.success) {
        setReadyToDisplayRank(true);
      } else {
        alertProvider();
      }
    } else {
      setReadyToDisplayRank(true)
    }
    
  }

  useEffect(()=> {
    const rankIdList = schoolReducer.rankIdList;
    if (Array.isArray(rankIdList)) {
      loadMissingSchoolData(rankIdList);
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
            showsVerticalScrollIndicator={false}
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


 // ------------ boutons header ---------------------------

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
}

export default SchoolRanking;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    mainContainerColor: Colors.backgroundColor,
    alignItems: "center",
    // padding: 10,
  },

  listContainer: {
    alignItems: "center",
    flex: 1,
    width: "90%",
    // padding: 5,
    // borderWidth: 1,
  },

});
