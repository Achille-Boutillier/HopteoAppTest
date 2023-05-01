import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";

import { Colors } from "../../constant/Colors";
import SearchBar from "../../component/SearchBar";
import HorizontalScroll from "../../component/HorizontalScroll";
import { getAllSchool, getSchoolByArea, searchSchool } from "../../BackEnd/controllers/explore";
import { alertProvider } from "../../BackEnd/errorHandler";
import { HeaderButton } from "../../component/TopBar";
import ExploreSchoolBanner from "../../component/ExploreSchoolBanner";
import PrimaryButton from "../../component/PrimaryButton";
import MessageContainer from "../../component/MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { getSchoolByAreaFailure, getSchoolByAreaRequest, getSchoolByAreaSuccess } from "../../core/reducers/schoolReducer";
import store from "../../core";
import { getBannerData } from "../../BackEnd/controllers/school";

const width = Dimensions.get("window").width;

export default function Explore({ navigation, route }) {

  const schoolByAreaState = useSelector((state) => state.schoolReducer.schoolByArea);
  // const schoolsData = useSelector((state) => state.schoolReducer.schoolsData);


  const scrollWidth = 0.95 * width;
  const scrollHeight = 90;
  const dispatch = useDispatch();

  const [exploreContent, setExploreContent] = useState();

  const [searchedData, setSearchedData] = useState(null);
  const [dataToDisplay, setDataToDisplay] = useState();
  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);
  const [blurValue, setBlurValue] = useState(1);
  // const [errorMessage, setErrorMessage] = useState(null);

  function loginScreenNavigation() {
    navigation.navigate("Login Screen");
  }
  // =============================Remasterisation===================================================

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

  // useEffect(() => {
  //   // 'focus' quand on atteri sur le screen; 'blur' quand on quitte
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     getSchoolByArea(); // TODO : voir si focus necessaire 
  //   });
  //   return unsubscribe;
  // }, [navigation]);


  //todo: a remettre :
  async function loadMissingSchoolData(schoolByArea) {
    let schoolIdList = [];
    const schoolsData = store.getState().schoolReducer.schoolsData;
    console.log( "[schoolsData]", schoolsData);
    for (let item of schoolByArea.listFormation) {
      console.log("[liste d'Id par section]",schoolByArea.schoolPack[item])
      schoolIdList = schoolIdList.concat(schoolByArea.schoolPack[item]);   //list1.concat(list2) concatène (=aditionne) les 2 listes
    }
    console.log( "[schoolIdList]", schoolIdList);
    const notMissingSchoolId = Object.keys(schoolsData);
    console.log( "[notMissingSchoolId]", notMissingSchoolId);
    const missingSchoolId = schoolIdList.filter((item)=>!notMissingSchoolId.includes(item))
    console.log( "[missingSchoolId : ]", missingSchoolId);
    if (missingSchoolId.length>0) {
      // loadMissingSchoolData(missingSchoolId)
      const data = await getBannerData(missingSchoolId, dispatch);
      if (data.success) {
        setIsReadyToDisplay(true);
      } else {
        alertProvider();
      }
    } else {
      setIsReadyToDisplay(true);    //todo: 
    }
  }

  useEffect(()=> {
    if (schoolByAreaState?.schoolPack){
      loadMissingSchoolData(schoolByAreaState);
    } else {
      // todo : else necessaire ?
    }
    
  }, [schoolByAreaState])

  // todo: fin a remettre







// ==========================================================================

  // ----------- getAllSchool --------------------------------------------------------
  // async function allSchoolRequest() {
  //   const data = await getAllSchool();
  //   if (data?.listFormation) {
  //     setExploreContent(data);
  //   } else {
  //     alertProvider(loginScreenNavigation);
  //   }
  // }

  // useEffect(() => {
  //   allSchoolRequest();
  // }, []);

  // useEffect(() => {
  //   // 'focus' quand on atteri sur le screen; 'blur' quand on quitte
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     allSchoolRequest(); // TODO : set un charging screen le temps du chargement
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  // useEffect(() => {
  //   if (exploreContent) {
  //     console.log(exploreContent.schoolPack["Informatique"]);
  //   }
  // }, [exploreContent]);

  // ---- fin getAllSchool ---------------------------------------------------------

  // ------ recherche -----------------------------
  function blurContent(value) {
    setBlurValue(value);
  }

  function handleStopResearch() {
    setSearchedData(null);
  }

  async function handlePressSearch(userInput) {
    const data = await searchSchool(userInput);
    setSearchedData(data);
  }

  useEffect(() => {
    if (searchedData) {
      if (!!searchedData?.schoolMatch[0]) {
        setDataToDisplay(
          <FlatList
            data={searchedData.schoolMatch}
            extraData={searchedData}      // mettre une 2eme data en liste ?
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            key={3} // obligatoire avec numColumns
            renderItem={({ item }) => {
              return (
                <View
                  style={[
                    styles.innerScrollViewContainer,
                    // scrollViewSize,
                    { width: scrollWidth / 3, height: scrollHeight },
                  ]}
                >
                  <ExploreSchoolBanner school={item} />
                </View>
              );
            }}
          />
        );
      } else {
        setDataToDisplay(
          <MessageContainer>
            Aucune école ne correspond à cette recherche
          </MessageContainer>
        );
      }
    } else if (isReadyToDisplay) {
      const schoolsData = store.getState().schoolReducer.schoolsData;
      const schoolByArea = store.getState().schoolReducer.schoolByArea;
      // const schoolByArea = useSelector((state) => state.schoolReducer.schoolByArea);
      setDataToDisplay(
        <FlatList
          data={schoolByArea.listFormation}
          extraData={schoolByArea}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={(section) => {
            if (schoolByArea.schoolPack[section.item].length !== 0) {
              return (
                <View style={{ marginBottom: 20 }}>
                  <View style={{ marginBottom: 5 }}>
                    <Text> {section.item} </Text>
                  </View>
                  <HorizontalScroll scrollViewSize={{ width: scrollWidth, height: scrollHeight,}}>
                    {schoolByArea.schoolPack[section.item].map(
                      (schoolId, index) => (
                        <View
                          key={schoolId}
                          style={[
                            styles.innerScrollViewContainer,
                            // scrollViewSize,
                            { width: scrollWidth / 3, height: scrollHeight },
                          ]}
                        >
                          <ExploreSchoolBanner school={schoolsData[schoolId]} schoolId={schoolId} />
                        </View>
                      )
                    )}
                  </HorizontalScroll>
                </View>
              );
            } else {
              return (
                <View style={{ marginBottom: 20 }}>
                  <View style={{ marginBottom: 5 }}>
                    <Text> {section.item} </Text>
                  </View>
                  <View
                    style={{ alignItems: "center", justifyContent: "center", alignSelf: "center", 
                      backgroundColor: Colors.white, width: 120, borderRadius: 5,
                      marginTop: 10, paddingVertical: 5,
                    }} 
                    >
                    <Text>Aucun favori</Text>
                  </View>
                </View>
              );
            }
          }}
        />
      );
    } else {
      setDataToDisplay(<ActivityIndicator color={Colors.orange500} />);
    }
  }, [searchedData, isReadyToDisplay]);

  // -----------------------------------------------

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
          handlePressSearch={handlePressSearch}
          handleStopResearch={handleStopResearch}
          blurContent={blurContent}
        />
      </View>

      <View style={{ opacity: blurValue, flex: 1 }}>{dataToDisplay}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    mainContainerColor: Colors.backgroundColor,
    alignItems: "center",
    // justifyContent: "center",
    // height: "20%",
    // width: "80%",
    // borderWidth: 1,
    // alignSelf: "center",
  },

  innerScrollViewContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // borderWidth: 1,
    flexWrap: "wrap",
    padding: 4,
  },
});
