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

import { useDispatch, useSelector } from "react-redux";
import { getSchoolByAreaFailure, getSchoolByAreaRequest, getSchoolByAreaSuccess } from "../../core/reducers/schoolReducer";
// import store from "../../core";
// import { getBannerData } from "../../BackEnd/controllers/school";
import SearchedComponent from "../../component/SearchedComponent";
import ExploreByArea from "../../component/ExploreByArea";
import { ActivityIndicator } from "react-native";

const width = Dimensions.get("window").width;

export default function Explore({ navigation, route }) {

  const scrollWidth = width;
  const scrollHeight = 120;
  const dispatch = useDispatch();

  // const []
  // const [searchedIdList, setSearchedIdList] = useState(null);
  const [isResearchSubmited, setIsResearchSubmited] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
  const [isResearching, setIsResearching] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);

  // -------- Obtenir list d'id by Area -----------------------------
  async function handleSchoolByArea() {

    dispatch(getSchoolByAreaRequest());
    const data = await getSchoolByArea();
    console.log("[schoolByArea]", data);
    // const data = await getSchoolByArea(dispatch);
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

  // TODO : voir si focus necessaire :

  // useEffect(() => {
  //   // 'focus' quand on atteri sur le screen; 'blur' quand on quitte
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     handleSchoolByArea();  
  //   });
  //   return unsubscribe;
  // }, [navigation]);


  // ------------- fin school by Area -------------------------------------
 

  // function (value) {
  //   // setBlurValue(value);
  //   console.log(value);
  // }

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


  // async function handleSubmitResearch() {
  //   const {schoolMatchId, success} = await searchSchool(searchInput);
  //   if (success) {
  //     setSearchedIdList(schoolMatchId);
  //   } else {
  //     alertProvider();
  //   }
  //   // setIsSubmitResearch(true);   //!!! s'assurer que searchedIdList déjà storée
  // }

  function onSubmitResearch(){  ///!! appelé que quand j'appuie sur rechercher, il faut qu'elle soit appelé onfocus du textInput
    setIsResearchSubmited(true);
    // setSearchInput(userInput);
  }

  // useEffect(()=> {
  //   if (isSubmitResearch) {
  //     handleSubmitResearch();
  //   }
  // }, [searchInput])


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
