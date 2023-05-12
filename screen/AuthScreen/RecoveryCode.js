
import { useEffect, useState } from "react";
import {FlatList, StyleSheet, View, ActivityIndicator, Text } from "react-native";
// import { Colors } from "../constant/Colors";
import { Colors } from "../../constant/Colors";
import InputComponent from "../../component/InputComponent";
import { BrandComponent } from "../../component/TopBar";
import TerciaryButton from "../../component/TerciaryButton";
import RecoveryCodeComponent from "../../component/RecoveryCodeComponent";
import PrimaryButton from "../../component/PrimaryButton";
import HeaderComponent from "../../component/HeaderComponent";


export default function RecoveryCode({navigation}) {

  
  const [isEditing, setIsEditing] = useState(false);


  // const [textInfo, setTextInfo] = useState("");
  // function onBackPress() {
  //   navigation.goBack();
  // }

  return (
    <View style={styles.mainContainer}>
      <HeaderComponent/>

      <View style={styles.bodyContainer}>
        
        {!isEditing 
          ? ((
          <View style={styles.brandContainer}> 
            <BrandComponent marginLeft={0} logoSize={60} fontSize={30}/> 
          </View> 
          )): null}

        <RecoveryCodeComponent setIsEditing={setIsEditing} />           

      </View>
      
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
  
});
