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

const width = Dimensions.get("window").width;
// const scrollViewSize = { width: 0.3 * width, height: 150 };

export default function Explore({ navigation, route }) {
  const scrollViewSize = { width: 0.9 * width, height: 150 };

  const [exploreContent, setExploreContent] = useState();
  const [isContentCharged, setIsContentCharged] = useState(false);

  function loginScreenNavigation() {
    navigation.navigate("Login Screen");
  }

  async function initAllSchool() {
    const data = await getAllSchool();
    if (data?.listFormation) {
      setExploreContent(data);
    } else {
      alertProvider(loginScreenNavigation);
    }
  }

  useEffect(() => {
    initAllSchool();
  }, []);

  useEffect(() => {
    if (exploreContent) {
      setIsContentCharged(true);
      console.log(exploreContent.schoolPack["Informatique"]);
    }
  }, [exploreContent]);

  // ------ recherche -----------------------------
  function onPressSearch(userInput) {
    searchSchool(userInput);
  }

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
  if (exploreContent) {
    return (
      <View style={styles.mainContainer}>
        <SearchBar onPressSearch={onPressSearch} />

        <FlatList
          data={exploreContent.listFormation}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={(section) => {
            console.log(section.item);
            return (
              // <View
              //   style={{
              //     height: 20,
              //     width: 200,
              //     backgroundColor: Colors.white,
              //   }}
              // ></View>
              <View style={{ marginBottom: 10 }}>
                <View style={{ marginBottom: 5 }}>
                  <Text> {section.item} </Text>
                </View>
                <HorizontalScroll scrollViewSize={scrollViewSize}>
                  {exploreContent.schoolPack[section.item].map(
                    (school, index) => (
                      <View
                        key={school.id}
                        style={[
                          styles.innerScrollViewContainer,
                          // scrollViewSize,
                          { width: 0.45 * width, height: 150 },
                        ]}
                      >
                        <Text style={styles.subTitle}>{school.nomEcole}</Text>
                      </View>
                    )
                  )}
                </HorizontalScroll>
              </View>
            );
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator />
      </View>
    );
  }
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
    backgroundColor: Colors.white,
    // paddingHorizontal: 20,
    // paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 10,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
  },

  rowItem: {
    width: "50%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
