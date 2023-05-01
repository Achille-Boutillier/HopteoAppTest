import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import PrimaryButton from "./PrimaryButton";
import { Colors } from "../constant/Colors";
import { useEffect, useState } from "react";

import { alertProvider } from "../BackEnd/errorHandler";
import { useSelector, useDispatch } from "react-redux";
import {setSchoolLikeFailure, setSchoolLikeSuccess } from "../core/reducers/schoolReducer";
import { modifyLike } from "../BackEnd/controllers/school";


export default function SchoolBanner({schoolId}) {    //id, rank, nomEcole, typeFormation, like
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const singleSchoolData = useSelector((state) => state.schoolReducer.schoolsData[schoolId]);
  // ? est-ce mieux d'envoyer 

  function loginScreenNavigation() {
    navigation.navigate("Login Screen");
  }

  // --------------- like ecole -------------------------------------
  
  async function handleLikePress() {
    const newLike = !singleSchoolData.like;
    // dispatch(setSchoolLikeSuccess({schoolId, newLike}));
    const success = await modifyLike(schoolId, newLike, dispatch);
    if (!success) {
      // dispatch(setSchoolLikeFailure({schoolId, newLike}));
      alertProvider("Un problème est survenu... Le like n'a pas été pris en compte.");
    }
  }
  // --------------- fin like ecole -------------------------------------

  function onPressSchool() {
    navigation.navigate("School Page", {schoolId, previousScreen: "SchoolRanking"});
  }


  return (
    <TouchableOpacity
      style={styles.bannerContainer}
      onPress={onPressSchool.bind(this, schoolId)}
    >
      <View style={styles.rankContainer}>
        <Text
          style={{
            color: Colors.grey,
            fontWeight: "500",
            fontSize: 14,
            marginTop: -2,
          }}
        >
          {singleSchoolData.rank}
        </Text>
      </View>
      <View style={styles.writtenInfo}>
        <Text style={{ fontWeight: "500" }}>{singleSchoolData.nomEcole}</Text>
        <Text style={{ color: Colors.grey }}>{singleSchoolData.typeFormation}</Text>
      </View>

      {/* like disabled : */}

      <View style={styles.rightContainer}>
        {/* <View style={styles.rightItems}>
          <Text>
            {globalSchoolGrade ? String(parseInt(globalSchoolGrade) + "%") : "0%"}
          </Text>
        </View> */}
        <View style={styles.rightItems}>
          <PrimaryButton
            onPress={handleLikePress}
            // name={isSchoolLiked ? "heart" : "heart-outline"}  
            name={singleSchoolData.like ? "heart" : "heart-outline"}  
            size={30}
            color={Colors.orange500}
            bigButton={true}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: 0.9 * Dimensions.get("window").width,
    height: 80,
    borderRadius: 15,
    paddingLeft: "6%",
    paddingRight: "3%",
    paddingVertical: "3%",
    marginTop: "1%",
    marginBottom: "1%",
  },

  rankContainer: {
    marginRight: "5%",
    // padding: 1,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 20,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    // left: 5,
    // flex: 1,
  },
  writtenInfo: {
    flexDirection: "column",
    width: "70%",
  },
  rightContainer: {
    width: "22%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    marginRight: "2%",
    paddingRight: "4%",
    // position: "absolute",
    // right: "5%",
  },
  rightItems: {
    paddingHorizontal: "10%",
  },
});
