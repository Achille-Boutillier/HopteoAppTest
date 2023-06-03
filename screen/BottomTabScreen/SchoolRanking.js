import {FlatList, StyleSheet, View, ActivityIndicator, Text,} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { calculNewRank, calculNewRankSuccess, calculNewRankFailure, getSchoolBannerRequest, getSchoolBannerSuccess, getSchoolBannerFailure } from "../../core/reducers/schoolReducer";
import { calculateNewRank, loadMissingSchoolData } from "../../BackEnd/rankingFunction1";
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
import { setRankingScreenNeedReload } from "../../core/reducers/forRankingReducer";
// import { getForRankingFailure, getForRankingRequest, getForRankingSuccess } from "../../core/reducers/forRankingReducer";


function SchoolRanking({ navigation, route }) {
  const schoolReducer = useSelector((state) => state.schoolReducer);
  // const themeObj = useSelector((state)=> state.themeReducer.themeObj)
  // const forRanking = useSelector(((state)=> state.forRankingReducer.))


  // todo : virer le componentToShow du useEffect, direct dans le return sous condition if

  
  // const [previousAbsoluteIndex, setPreviousAbsoluteIndex] = useState(-1);
  const [readyToDisplayRank, setReadyToDisplayRank] = useState(false);
  const [componentToShow, setComponentToShow] = useState();
  const dispatch = useDispatch();

  

  // ---------- rank calcul -------------------------------------------
 
  useEffect(()=> {
    const swipeStateHasChanged = store.getState().swipeReducer.swipeStateHasChanged;
    const rankIdList = store.getState().schoolReducer.rankIdList;
    if (!swipeStateHasChanged ){
      if ( Array.isArray(rankIdList) ){
        console.log("[rankIdList]", rankIdList);
        loadMissingSchoolData(rankIdList, setReadyToDisplayRank, dispatch);
      } else {
        setReadyToDisplayRank(true);
      }
      
    }
  }, [])

  useEffect(() => {
    // 'focus' quand on atteri sur le screen; 'blur' quand on quitte
    const unsubscribe = navigation.addListener("focus", () => {
    const swipeStateHasChanged = store.getState().swipeReducer.swipeStateHasChanged;
    const rankingScreenNeedReload = store.getState().swipeReducer.rankingScreenNeedReload;
      if (swipeStateHasChanged){    // if new calcul needed
        calculateNewRank(setReadyToDisplayRank, dispatch, "rankingScreen"); 
        dispatch(setSwipeStateHasChanged(false));
      } 
      // else {
      //   if (rankingScreenNeedReload) {      // pour être sûr que l'ordre de la flatList est maj
      //   (()=>setReadyToDisplayRank(false))();
      //   dispatch(setRankingScreenNeedReload(false));
      //   (()=>setReadyToDisplayRank(true))();
      //   }
      // }
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

  // function loadRanking() {
  //   if (Array.isArray(schoolReducer.rankIdList)) {
  //     setComponentToShow(
  //       <FlatList
  //         data={schoolReducer.rankIdList}
  //         // data={schoolReducer.rankIdList.slice(0, 40)}
  //         // extraData={} 
  //         keyExtractor={(item) => item}
  //         showsVerticalScrollIndicator={false}
  //         renderItem={({item}) => {
  //           return (<SchoolBanner schoolId={item} />);
  //         }}
  //       />
  //     );
  //   } else {
  //     setComponentToShow(
  //       <MessageContainer>{schoolReducer.rankIdList}</MessageContainer>
  //     );
  //   }
  // } 

  useEffect(() => {
    if (readyToDisplayRank) {
      // const rankIdList = schoolReducer.rankIdList;
      
      if (Array.isArray(schoolReducer.rankIdList)) {
        setComponentToShow(
          <FlatList
            data={schoolReducer.rankIdList}
            // data={schoolReducer.rankIdList.slice(0, 40)}
            // extraData={schoolReducer.rankIdList} 
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (<SchoolBanner schoolId={item} />);
            }}
          />
        );
      } else if (typeof schoolReducer.rankIdList === 'string') {
        setComponentToShow(
          <MessageContainer>{schoolReducer.rankIdList}</MessageContainer>
        );
      } else {
        setComponentToShow(
          <MessageContainer>{"Une erreur est survenue... Nos équipes mettent tout en oeuvre pour réparer ce beug."}</MessageContainer>
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

  useEffect(()=> {
    console.log("je passe dans le reclassement")
    console.log("[rankIdList]", schoolReducer.rankIdList);
    if (schoolReducer.rankIdList && readyToDisplayRank) {
      (()=>setReadyToDisplayRank(false))();
      setTimeout(function() {
        console.log("Delayed message");
      }, 500);
      (()=>setReadyToDisplayRank(true))();
    }   
  }, [schoolReducer.rankIdList])



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
      {/* <View style={styles.listContainer}>{componentToShow}</View> */}
      <View style={styles.listContainer}>
        { readyToDisplayRank 
          ? (
            Array.isArray(schoolReducer.rankIdList)
              ? (
                <FlatList
                  data={schoolReducer.rankIdList}
                  // data={schoolReducer.rankIdList.slice(0, 40)}
                  // extraData={schoolReducer.rankIdList} 
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (<SchoolBanner schoolId={item} />);
                  } }
                />
              ): (
                <MessageContainer>{schoolReducer.rankIdList}</MessageContainer>
              )
            
          ) : (

            <View style={{flex: 1, justifyContent: "center", alignItems: "center"} }>
              <ActivityIndicator size="large" color={Colors.orange500} />
            </View>
      )

        }
        </View>
      
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
