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
import { getAllSchool, searchSchool } from "../../BackEnd/controllers/explore";
import { alertProvider } from "../../BackEnd/errorHandler";
import { HeaderButton } from "../../component/TopBar";
import SchoolComponent from "../../component/SchoolComponent";
import PrimaryButton from "../../component/PrimaryButton";

const width = Dimensions.get("window").width;

export default function Explore({ navigation, route }) {
  const scrollWidth = 0.95 * width;
  const scrollHeight = 90;

  const [exploreContent, setExploreContent] = useState();
  const [searchedData, setSearchedData] = useState();
  const [dataToDisplay, setDataToDisplay] = useState();
  const [isResearchDisplayed, setIsResearchDisplayed] = useState(false);

  function loginScreenNavigation() {
    navigation.navigate("Login Screen");
  }

  // ----------- getAllSchool --------------------------------------------------------
  async function allSchoolRequest() {
    const data = await getAllSchool();
    if (data?.listFormation) {
      setExploreContent(data);
    } else {
      alertProvider(loginScreenNavigation);
    }
  }

  // useEffect(() => {
  //   allSchoolRequest();
  // }, []);

  useEffect(() => {
    // 'focus' quand on atteri sur le screen; 'blur' quand on quitte
    const unsubscribe = navigation.addListener("focus", () => {
      allSchoolRequest(); // TODO : set un charging screen le temps du chargement
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (exploreContent) {
      console.log(exploreContent.schoolPack["Informatique"]);
    }
  }, [exploreContent]);

  // ---- fin getAllSchool ---------------------------------------------------------

  // ------ recherche -----------------------------
  async function onPressSearch(userInput) {
    const data = await searchSchool(userInput);
    // console.log("searchResponse", searchResponse);
    setSearchedData(data);
  }

  useEffect(() => {
    if (searchedData) {
      setIsResearchDisplayed(true);
      // console.log(searchedData);
      setDataToDisplay(
        <FlatList
          data={searchedData.schoolMatch}
          extraData={searchedData}
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
                <SchoolComponent school={item} />
              </View>
            );
          }}
        />
      );
    } else if (exploreContent) {
      setDataToDisplay(
        <FlatList
          data={exploreContent.listFormation}
          extraData={exploreContent}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={(section) => {
            return (
              <View style={{ marginBottom: 20 }}>
                <View style={{ marginBottom: 5 }}>
                  <Text> {section.item} </Text>
                </View>
                <HorizontalScroll
                  scrollViewSize={{ width: scrollWidth, height: scrollHeight }}
                >
                  {exploreContent.schoolPack[section.item].map(
                    (school, index) => (
                      <View
                        key={school.id}
                        style={[
                          styles.innerScrollViewContainer,
                          // scrollViewSize,
                          { width: scrollWidth / 3, height: scrollHeight },
                        ]}
                      >
                        <SchoolComponent school={school} />
                      </View>
                    )
                  )}
                </HorizontalScroll>
              </View>
            );
          }}
        />
      );
    } else {
      setDataToDisplay(<ActivityIndicator color={Colors.orange500} />);
    }
  }, [searchedData, exploreContent]);

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
      <View style={{ width: "100%" }}>
        <SearchBar onPressSearch={onPressSearch} />
        {isResearchDisplayed ? (
          <View
            style={{ flexDirection: "row", position: "absolute", right: 10 }}
          >
            <PrimaryButton
              onPress={() => {
                setIsResearchDisplayed(null);
                setSearchedData(false);
              }}
              name={"close"}
              size={25}
              color={Colors.orange500}
            />
          </View>
        ) : null}
      </View>
      {dataToDisplay}
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
