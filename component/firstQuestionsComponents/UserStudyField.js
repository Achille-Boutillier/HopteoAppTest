import { View, StyleSheet, Text, Button, TextInput, ScrollView } from "react-native";
// import { useState, useEffect } from "react";

import { Colors } from "../../constant/Colors";
import SecondaryButton from "../buttons/SecondaryButton";
import { useSelector } from "react-redux";

export default function UserStudyField({ onPressField }) {

  let filiere = useSelector((state) => state.userSettingReducer.filiereList);
  filiere = [...new Set(filiere)];
  const leftField = filiere.slice(0, Math.round(filiere.length/2));
  const rightField = filiere.slice(Math.round(filiere.length/2), filiere.length);


  return (
    // <View style={styles.mainContainer}>

      <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} >


      <View style={styles.questionContainer}>
        <Text style={styles.textStyle}>
          {"Sélectionne ta filière"}
        </Text>
      </View>


      <View style={styles.buttonContainer}>

        <View style={styles.ButtonColumnContainer}>
          {leftField.map( (item) => {
              return <SecondaryButton key={item} onPress={onPressField.bind(this, item)} buttonText={item} />
            }
          )}
        </View>

        <View style={styles.ButtonColumnContainer}>
          {rightField.map( (item) => {
              return <SecondaryButton key={item} onPress={onPressField.bind(this, item)} buttonText={item} />
            }
          )}
          <SecondaryButton onPress={onPressField.bind(this, "Autre")} buttonText="Autre" />          
        </View>
        
      </View>
      
      {/* <SecondaryButton onPress={onPressField.bind(this, "Autre")} buttonText="Autre" preSized={false}/> */}
      </ScrollView>

  );
}


const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    // justifyContent: "center",
    // width: "90%",
  },
  questionContainer: {
    // width: "70%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    // borderWidth: 1
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    // borderWidth: 1,
    // flex: 1,
    width: "95%",
    marginTop: "5%",
    flexDirection: "row",
  },
  ButtonColumnContainer: {
    width: "50%", 
    alignItems: "center",
    marginVertical: 10,
    // flex: 1,
    // borderWidth: 1,
  },
 
});