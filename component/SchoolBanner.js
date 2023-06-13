import {StyleSheet, View, Text, TouchableOpacity, Dimensions,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import PrimaryButton from "./buttons/PrimaryButton";
import { Colors } from "../constant/Colors";
import { useEffect, useState } from "react";


import { alertProvider } from "../BackEnd/errorHandler";
import { useSelector, useDispatch } from "react-redux";
import { modifyLike } from "../BackEnd/controllers/school";
import RibbonComponent from "./RibbonComponent";

const screenWidth = Dimensions.get("window").width;

export default function SchoolBanner({schoolId}) {    //id, rank, nomEcole, typeFormation, like
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const singleSchoolData = useSelector((state) => state.schoolReducer.schoolsData[schoolId]);
  const currentLike = useSelector((state) => state.schoolReducer.likedSchoolObject[schoolId]);
  const [bannerColor, setBannerColor] = useState(null);

  useEffect(()=>{
    if (singleSchoolData?.rank<3) {
    // console.log( "[singleSchoolData]" , singleSchoolData);
    }
  }, [singleSchoolData])

  // function loginScreenNavigation() {
  //   navigation.navigate("Login Screen");
  // }

  // --------------- like ecole -------------------------------------
  
  async function handleLikePress() {
    // const newLike = !singleSchoolData.like;
    // dispatch(setSchoolLikeSuccess({schoolId, newLike}));
    const success = await modifyLike(schoolId, !currentLike, dispatch);
    if (!success) {
      alertProvider("Un problème est survenu... Le like n'a pas été pris en compte.");
    }
  }
  // --------------- fin like ecole -------------------------------------

  function onPressSchool() {
    navigation.navigate("School Page", {schoolId, previousScreen: "SchoolRanking"});
  }


  return (
    <TouchableOpacity
      style={[styles.bannerContainer, bannerColor ? { borderColor: bannerColor} : {borderColor: Colors.white}]}
      onPress={onPressSchool.bind(this, schoolId)}
    >
      <RibbonComponent rank={singleSchoolData?.rank} size={35} setBannerColor={setBannerColor} />
      
      <View style={styles.writtenInfo}>
        <Text style={{ fontWeight: "500" }}>{singleSchoolData.nomEcole}</Text>
        <Text style={{ color: Colors.grey }}>{singleSchoolData.typeFormation}</Text>
      </View>

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
            name={currentLike ? "heart" : "heart-outline"}  
            size={30}
            // color={Colors.orange500}
            color={bannerColor ? bannerColor : Colors.orange500}
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
    width: 0.9 * screenWidth,
    borderWidth: 2,
    height: 80,
    borderRadius: 15,
    paddingLeft: "4%",
    paddingRight: "3%",
    paddingVertical: "3%",
    marginTop: "1%",
    marginBottom: "1%",
  },

  writtenInfo: {
    marginLeft: "3%",
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
    // paddingHorizontal: "10%",
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    // borderWidth: 1
  },
});
