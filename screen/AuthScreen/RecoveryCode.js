
import { useEffect, useState } from "react";
import {FlatList, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { Colors } from "../../constant/Colors";
// import { BrandComponent } from "../../component/TopBar";
import RecoveryCodeComponent from "../../component/RecoveryCodeComponent";
import HeaderComponent from "../../component/HeaderComponent";
// import { sendRecoveryCode } from "../../BackEnd/controllers/userData";
import ActivityComponent from "../../component/ActivityComponent";
import { Platform } from "react-native";


export default function RecoveryCode({navigation}) {

  
  const [isEditing, setIsEditing] = useState(false);
  const [isCharging, setIsCharging] = useState(false);

  function onBackPress() {
    navigation.goBack();
  }


  return (
    <View style={styles.mainContainer}>
      <HeaderComponent onBackPress={onBackPress}/>

      <View style={[styles.bodyContainer, isCharging ? {opacity: 0.3} : null, (isEditing && Platform.OS === "ios") ? {marginBottom: "40%"} : null]}>
        {/*!isEditing 
          ? (
            <View style={styles.brandContainer}> 
              <BrandComponent /> 
            </View> 
          ): null*/}
        <RecoveryCodeComponent setIsEditing={setIsEditing} isCharging={isCharging} setIsCharging={setIsCharging} />     

      </View>

      {isCharging ? <ActivityComponent/> : null }      

      
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    // justifyContent: "center",
    // borderWidth:1
    // marginTop: "10%",
  },
  
  bodyContainer: {
    flex: 1,
    // width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1
  },

  brandContainer: {
    // borderWidth: 1,
    marginBottom: 30,
  },
  chargingContainer: {
    position: "absolute",
    top: 5,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  
});
