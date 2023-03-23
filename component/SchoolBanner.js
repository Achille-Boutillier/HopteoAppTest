import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import PrimaryButton from "./PrimaryButton";
import { Colors } from "../constant/Colors";
import { useEffect, useState } from "react";
import {getSchool, onSchoolLike, getLikeValue } from "../BackEnd/controllers/classement";


export default function SchoolBanner({id, rank, nomEcole, typeFormation, globalSchoolGrade, like, rankList, setRankList }) {

  const navigation = useNavigation();
                                                              

const [schoolData, setSchoolData] = useState({});
const [isSchoolPressed, setIsSchoolPressed] = useState(false);
// const [isSchoolLiked, setIsSchoolLiked] = useState(like);


// --------------- like ecole -------------------------------------
// ? like disabled car pas le time


// async function handleLikePress() {
//   console.log("like press");
//   // const bool = !isSchoolLiked;
//   // setIsSchoolLiked(!isSchoolLiked);
//   const likeSuccess = await onSchoolLike(id, !like);
//   if(likeSuccess){
//     updateSchool(id, like)
//   }
//   return;
//   // console.log(likeSuccess);
// };

// function updateSchool(currentid,  currentLike){
//   const index = rankList.findIndex((uni)=> uni.id === currentid);
//   if(index !== -1){
//     rankList[index].like = !currentLike;
//     return setRankList(rankList);
//   }
//   return console.error("index pas trouvé");
// }
// --------------- fin like ecole -------------------------------------


// -------------- école pressed ----------------------------------

async function getSchoolData() {
  const data = await getSchool(id);
  // console.table(data);
  setSchoolData(data);
  return data;
}

function onPressSchool() {
  setIsSchoolPressed(true);
}

useEffect(() => {
  if (isSchoolPressed) {    // empêcher l'execution inutile
    getSchoolData();
  }
}, [isSchoolPressed])

useEffect(() => {
  if (isSchoolPressed) {
    setIsSchoolPressed(false);
    navigation.navigate(
      "School Page", 
      {schoolPressedData : schoolData}
    )
  }
}, [schoolData])

// ------------- fin ecole pressed -----------------------------------



// // ============= Pour la comparaison école sur profil =======================================================================================================

////const [isSchoolSelectedForComparison, setIsSchoolSelectedForComparison] = useState(false);


////function onSchoolLongPress() {
////  if (profilSchoolBanner) {
////    setIsSchoolSelectedForComparison((bool) => !bool);
////  }
////}

////useEffect(() => {
////  if (profilSchoolBanner) {     // profilSchoolBanner = boolean venant de profil user
////    handleSchoolLongPress(id, isSchoolSelectedForComparison); // fonction handleSchoolLongPress provenant de la page profil user
////  }
//// }, [isSchoolSelectedForComparison])


// // ============= fin comparaison =======================================================================================================


  return (
    <TouchableOpacity
      ////style={[profilSchoolBanner ? styles.profilSchoolBannerContainer : styles.bannerContainer, {backgroundColor: isSchoolSelectedForComparison ? Colors.blue400 : Colors.white}] }
      style={styles.bannerContainer}
      onPress={onPressSchool.bind(this, id)}
      // //onLongPress={onSchoolLongPress}   // comparaison
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
          {rank}
        </Text>
      </View>
      <View style={styles.writtenInfo}>
        <Text style={{ fontWeight: "500" }}>{nomEcole}</Text>
        <Text style={{ color: Colors.grey }}>{typeFormation}</Text>
      </View>

      {/* like disabled : */}

      {/* <View style={styles.rightContainer}>
        <View style={styles.rightItems}>
          <Text>
            {globalSchoolGrade ? String(parseInt(globalSchoolGrade) + "%") : "0%"}
          </Text>
        </View>
        <View style={styles.rightItems}>
          <PrimaryButton
            onPress={handleLikePress}
            // name={isSchoolLiked ? "heart" : "heart-outline"}  
            name={like ? "heart" : "heart-outline"}  
            size={30}
            color={Colors.orange500}
            bigButton={true}
          />
        </View>
      </View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: "center",
    width: 0.9*Dimensions.get('window').width,
    height: 80,
    borderRadius: 15,
    paddingLeft: "6%",
    paddingRight: "3%",
    paddingVertical: "3%",
    marginTop: "1%",
    marginBottom: "1%",
  },
  //// profilSchoolBannerContainer: {
  ////   flexDirection: 'row',
  ////   alignItems: 'center',
  ////   alignSelf: "center",
  ////   width: "92%",
  ////   borderRadius: 15,
  ////   paddingVertical: "4%",
  ////   paddingRight: "6%",
  ////   paddingLeft: "4%",
  ////   marginTop: "2%",
  ////   marginBottom: "1%",
  //// },
  rankContainer: {
    marginRight: "5%",
    // padding: 1,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 20,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // left: 5,
    // flex: 1,
  },
  writtenInfo: {
    flexDirection: 'column',
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
  }

});
