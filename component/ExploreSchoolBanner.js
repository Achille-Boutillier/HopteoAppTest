import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect} from "react";

import { Colors } from "../constant/Colors";

export default function ExploreSchoolBanner({ school, schoolId }) {
  const navigation = useNavigation();

  useEffect(()=> {
    console.log("[schoolId]", schoolId)
    console.log("[school]", school[schoolId])
  }, [])

  function onPressSchool() {
    navigation.navigate("School Page", {schoolId, previousScreen: "Explore"});
  }

  // ! ----- manage minimal fontSize (Android) -----------------
  // ! --- non fonctionnel : à cause de "numberOfLines", textWidth ne dépasse jamais ViewWidth, -------------
  //! ----------- => on ne passe jamais dans "if" ----------------
  // const initialNameFontSize = 12;
  // const [nameFontSize, setNameFontSize] = useState(initialNameFontSize);
  // const [viewWidth, setViewWidth] = useState();

  // function handleViewLayout({ nativeEvent: { layout } }) {
  //   setViewWidth(layout.width);
  // }

  // const handleTextLayout = ({ nativeEvent: { layout } }) => {
  //   console.log("handleTextLayout");
  //   const textWidth = layout.width;
  //   if (textWidth > viewWidth) {
  //     const newFontSize = Math.max(
  //       Math.floor((viewWidth / textWidth) * initialNameFontSize),
  //       9.5
  //     );
  //     setNameFontSize(newFontSize);
  //     console.log(newFontSize);
  //   }
  // };
  // ! ---------------------------------------------------------------------------------

  return (
    <TouchableOpacity style={styles.schoolContainer} onPress={onPressSchool}>
      <View
        style={styles.schoolNameContainer}
        // onLayout={handleViewLayout}  //! manage minimal fontSize (Android)
      >
        <Text
          numberOfLines={3}
          adjustsFontSizeToFit={true} // IOS & Android
          // minimumFontSize={9.5} // IOS only
          // onLayout={handleTextLayout} // IOS & Android   //! manage minimal fontSize (Android)
          style={[
            styles.schoolName,
            // { fontSize: nameFontSize }, // ! manage minimal fontSize (Android)
          ]}
        >
          {school.nomEcole}
        </Text>
      </View>

      <View style={styles.typeFormationContainer}>
        <Text
          numberOfLines={2}
          // minimumFontScale={0.8} // ! android only
          style={styles.typeFormation}
        >
          {school.typeFormation}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  schoolContainer: {
    backgroundColor: Colors.white,
    width: "100%",
    flex: 1,
    height: "100%",
    borderRadius: 10,
    alignItems: "center",
    // justifyContent: "space-between",
    padding: 5,
  },

  schoolNameContainer: {
    height: "65%",
    width: "100%",
    justifyContent: "center",
  },

  schoolName: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },

  typeFormationContainer: {
    height: "35%",
    width: "100%",
    justifyContent: "center",
  },
  typeFormation: {
    textAlign: "center",
    fontSize: 10,
    // color: Colors.grey,
  },
});
