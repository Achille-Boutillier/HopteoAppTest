import { StyleSheet, View, Text, TouchableOpacity, Button, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { modifyLike } from "../BackEnd/controllers/school";
import { useDispatch, useSelector } from "react-redux";

// import PrimaryButton from "./PrimaryButton";
import { useEffect} from "react";

import { Colors } from "../constant/Colors";

export default function ExploreSchoolBanner({ schoolId }) {
  const navigation = useNavigation();
  const singleSchoolData = useSelector((state) => state.schoolReducer.schoolsData[schoolId]);
  const dispatch = useDispatch();

  function onPressSchool() {
    navigation.navigate("School Page", {schoolId, previousScreen: "Explore"});
  }

  async function handleLikePress() {
    const newLike = !singleSchoolData.like;
    const success = await modifyLike(schoolId, newLike, dispatch);
    if (!success) {
      alertProvider("Un problème est survenu... Le like n'a pas été pris en compte.");
    }
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
          numberOfLines={2}
          adjustsFontSizeToFit={true} // IOS & Android
          // minimumFontSize={9.5} // IOS only
          // onLayout={handleTextLayout} // IOS & Android   //! manage minimal fontSize (Android)
          style={
            [styles.schoolName,
            // { fontSize: nameFontSize }, // ! manage minimal fontSize (Android)
          ]}
        >
          {singleSchoolData.nomEcole}
        </Text>
      </View>

      <View style={styles.typeFormationContainer}>
        <Text
          numberOfLines={2}
          // minimumFontScale={0.8} // ! android only
          style={styles.typeFormation}
        >
          {singleSchoolData.typeFormation}
        </Text>
      </View>
      {/* <View style={styles.likeContainer}> */}
        <Pressable 
          style={{justifyContent: "center", alignItems: "center", width: 40, height: 28 }} 
          onPress={handleLikePress}
        >
          <Ionicons name={singleSchoolData.like ? "heart" : "heart-outline"} size={24} color={Colors.orange500} />
        </Pressable>
          
        
        {/* </View> */}
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
    height: "45%",
    width: "100%",
    justifyContent: "center",
    // borderWidth:1,
  },

  schoolName: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },

  typeFormationContainer: {
    height: "24%",
    width: "100%",
    justifyContent: "center",
    // borderWidth:1,
  },
  typeFormation: {
    textAlign: "center",
    fontSize: 12,
    // color: Colors.grey,
  },
  // likeContainer: {
  //   width: "100%",
  //   borderWidth: 1,
  // // height: "30%",
  // }
});
