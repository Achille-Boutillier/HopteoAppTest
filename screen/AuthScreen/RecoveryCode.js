
import { useEffect, useState } from "react";
import {FlatList, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { Colors } from "../../constant/Colors";
import { BrandComponent } from "../../component/TopBar";
import RecoveryCodeComponent from "../../component/RecoveryCodeComponent";
import HeaderComponent from "../../component/HeaderComponent";
import { sendRecoveryCode } from "../../BackEnd/controllers/userData";
import ActivityComponent from "../../component/ActivityComponent";


export default function RecoveryCode({}) {

  
  const [isEditing, setIsEditing] = useState(false);
  const [isCharging, setIsCharging] = useState(false);



  return (
    <View style={styles.mainContainer}>
      <HeaderComponent/>

      <View style={[styles.bodyContainer, isCharging ? {opacity: 0.3} : null]}>
        
        {!isEditing 
          ? (
            <View style={styles.brandContainer}> 
              <BrandComponent marginLeft={0} logoSize={60} fontSize={30}/> 
            </View> 
          ): null}

        <RecoveryCodeComponent setIsEditing={setIsEditing} isCharging={isCharging} setIsCharging={setIsCharging} />     

      </View>

      {isCharging  ? <ActivityComponent/> : null }      

      
      
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
    width: "100%",
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
