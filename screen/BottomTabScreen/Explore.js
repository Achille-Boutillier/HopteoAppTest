import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from "react-native";
import { useEffect, useState, useLayoutEffect, useCallback } from "react";

import { Colors } from "../../constant/Colors";
import SearchBar from "../../component/SearchBar";
import { getSchoolByArea, searchSchool } from "../../BackEnd/controllers/explore";
import { alertProvider } from "../../BackEnd/errorHandler";
import { HeaderButton } from "../../component/TopBar";
import ActivityComponent from "../../component/ActivityComponent.js";

import { useDispatch} from "react-redux";
import { getSchoolByAreaFailure, getSchoolByAreaRequest, getSchoolByAreaSuccess } from "../../core/reducers/schoolReducer";
import { setSwipeStateHasChanged } from "../../core/reducers/swipeReducer";
import { loadMissingSchoolData } from "../../BackEnd/rankingFunction";
import store from "../../core";

import SearchedComponent from "../../component/exploreComponents/SearchedComponent";
import ExploreByArea from "../../component/exploreComponents/ExploreByArea";
import { calculateNewRank } from "../../BackEnd/rankingFunction";
// import { ActivityIndicator } from "react-native";

const width = Dimensions.get("window").width;

export default function Explore({ navigation}) {

  const scrollWidth = width;
  const scrollHeight = 120;
  const dispatch = useDispatch();

  const [readyToDisplayRank, setReadyToDisplayRank] = useState(false);
  const [isResearchSubmited, setIsResearchSubmited] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
  const [isResearching, setIsResearching] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);

  // -------- Obtenir list d'id by Area -----------------------------
  async function handleSchoolByArea() {

    dispatch(getSchoolByAreaRequest());
    const data = await getSchoolByArea();
    console.log("[schoolByArea]", data);
    if (data.success) {
      delete data.success;
      dispatch(getSchoolByAreaSuccess(data));
    } else {
      dispatch(getSchoolByAreaFailure());
      if (data.message) {
        alertProvider(data.message);
      } else {
        alertProvider("Une erreur de chargement est survenue...");
      }
    }
  }

  useEffect(() => {
    handleSchoolByArea();
  }, [])

  // ------------- fin school by Area -------------------------------------
 
  // ----------------------- Calcul rank --------------------------------------

  useEffect(()=> {
    const swipeStateHasChanged = store.getState().swipeReducer.swipeStateHasChanged;
    const rankIdList = store.getState().schoolReducer.rankIdList;
    if (!swipeStateHasChanged){
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
      const exploreScreenNeedReload = store.getState().swipeReducer.exploreScreenNeedReload;
      if (swipeStateHasChanged){
        console.log("New rank calculating ...........................................");
        // calculateNewRank(()=>{}, dispatch); 
        calculateNewRank(setReadyToDisplayRank, dispatch, "exploreScreen"); 
        dispatch(setSwipeStateHasChanged(false));
      } 
      // else {
      //   if (exploreScreenNeedReload) {      // pour être sûr que l'ordre de la flatList est maj
      //   (()=>setReadyToDisplayRank(false))();
      //   dispatch(setExploreScreenNeedReload(false));
      //   (()=>setReadyToDisplayRank(true))();
      //   }
      // }
    });
    return unsubscribe;
  }, [navigation]);


// ------------ Fin calcul rank ------------------------------------------

  const onBeginResearch = useCallback(()=> {   // todo: error : excessive number Pending callback (à cause du set passé au child)
    console.log("Passing throught handleIsEditing");
    setIsResearching(true);
  }, [])

  function handleStopResearch() {
    setSearchInput("");
    setIsResearchSubmited(false); 
    setIsResearching(false)
    // setSearchedIdList(null);
  }


  function onSubmitResearch(){  ///!! appelé que quand j'appuie sur rechercher, il faut qu'elle soit appelé onfocus du textInput
    setIsResearchSubmited(true);
    // setSearchInput(userInput);
  }


  // -------------Header button -----------
  function onSettingsPress() {
    navigation.navigate("Settings");
  }

  useLayoutEffect(() => {
    // créer les boutons du header
    navigation.setOptions({
      headerRight: () => <HeaderButton onSettingsPress={onSettingsPress} />,
    });
  }, [navigation]);

  //---------------------------------

  return (
    <View style={styles.mainContainer}>

      {readyToDisplayRank 
        ? (
          <>
            <View style={{ width: "100%", marginTop: "2%" }}>
              <SearchBar
                searchInput={searchInput}
                setSearchInput = {setSearchInput}
                onSubmitResearch={onSubmitResearch}
                handleStopResearch={handleStopResearch}
                onBeginResearch={onBeginResearch}
              />
            </View>

            {!isResearching ? <ExploreByArea scrollWidth={scrollWidth} scrollHeight={scrollHeight}/> : null}

            {isResearching
              ? (
                <View style={styles.researchContainer}>
                  <SearchedComponent 
                    searchInput={searchInput} 
                    isResearchSubmited={isResearchSubmited} 
                    setIsResearchSubmited={setIsResearchSubmited} 
                    scrollWidth={scrollWidth} 
                    scrollHeight={scrollHeight} 
                  />
                </View>
              )
              : null
            }
          </>
        ) :  <ActivityComponent darkBackground={false}/>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    mainContainerColor: Colors.backgroundColor,
    // alignItems: "center",
    paddingTop: "6%",
    // borderWidth:1
  },

  innerScrollViewContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // borderWidth: 1,
    flexWrap: "wrap",
    padding: 6,
  },
  researchContainer: {
    flex: 1,
    
  },
});
