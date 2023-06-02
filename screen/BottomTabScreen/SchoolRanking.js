import {FlatList, StyleSheet, View, ActivityIndicator, Text,} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { calculNewRank, calculNewRankSuccess, calculNewRankFailure, getSchoolBannerRequest, getSchoolBannerSuccess, getSchoolBannerFailure } from "../../core/reducers/schoolReducer";
import { calculateNewRank } from "../../BackEnd/rankingFunction1";
import { Colors } from "../../constant/Colors";
import {getRankingAlgoData} from "../../BackEnd/controllers/ranking";
// import { generateRanking } from "../../BackEnd/rankingFunction1";
// import { generateRankin } from "../../BackEnd/rankingFunction1";
// import { generateRanking } from "../../BackEnd/rankingFunction";
import { getBannerData } from "../../BackEnd/controllers/school";
import SchoolBanner from "../../component/SchoolBanner";
import MessageContainer from "../../component/MessageContainer";
import { HeaderButton } from "../../component/TopBar";
import { alertProvider } from "../../BackEnd/errorHandler";
import { useSelector, useDispatch } from "react-redux";
import { setSwipeStateHasChanged, storeRankingAbsoluteIndex } from "../../core/reducers/swipeReducer";
import store from "../../core";
// import { getForRankingFailure, getForRankingRequest, getForRankingSuccess } from "../../core/reducers/forRankingReducer";


function SchoolRanking({ navigation, route }) {
  const schoolReducer = useSelector((state) => state.schoolReducer);
  // const themeObj = useSelector((state)=> state.themeReducer.themeObj)
  // const forRanking = useSelector(((state)=> state.forRankingReducer.))


  // todo : virer le componentToShow du useEffect, direct dans le return sous condition if

  // todo: schoolReducer.rankIdList ne change pas tout le temps ==> reste sur activityIndicator si message identique
  //todo: créer un nouvel état qui précise quand le calcul des écoles a été fait (différent de l'état isReadyToDisplay)
  
  // const [previousAbsoluteIndex, setPreviousAbsoluteIndex] = useState(-1);
  const [readyToDisplayRank, setReadyToDisplayRank] = useState(false);
  const [componentToShow, setComponentToShow] = useState();
  const dispatch = useDispatch();

  

  // ---------- rank calcul -------------------------------------------
 

  useEffect(() => {
    // 'focus' quand on atteri sur le screen; 'blur' quand on quitte
    const unsubscribe = navigation.addListener("focus", () => {
      const swipeStateHasChanged = store.getState().swipeReducer.swipeStateHasChanged;
      if (swipeStateHasChanged){
        calculateNewRank(setReadyToDisplayRank, dispatch); 
        dispatch(setSwipeStateHasChanged(false));
      }
    });
    return unsubscribe;
  }, [navigation]);
// ---------------------- fin calcul ----------------------------------------------------

  // useEffect(()=> {
  //   const rankIdList = schoolReducer.rankIdList;
  //   if (Array.isArray(rankIdList)) {
  //     loadMissingSchoolData(rankIdList);
  //   } else {
  //     setReadyToDisplayRank(true);
  //   }
  // }, [schoolReducer.rankIdList])



  useEffect(() => {
    if (readyToDisplayRank) {
      // const rankIdList = schoolReducer.rankIdList;
      
      if (Array.isArray(schoolReducer.rankIdList)) {
        setComponentToShow(
          <FlatList
            data={schoolReducer.rankIdList}
            // data={schoolReducer.rankIdList.slice(0, 40)}
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
