import { View, StyleSheet, Text, Button, TextInput } from "react-native";
// import { useState, useEffect } from "react";

import { Colors } from "../../constant/Colors";
import SecondaryButton from "../SecondaryButton";

export default function UserStudyField({ onPressField }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.questionContainer}>
        <Text style={styles.textStyle}>
          {"Sélectionne ta filière"}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.ButtonColumnContainer}>
          <SecondaryButton onPress={onPressField.bind(this, "MPSI")} buttonText="MPSI" />
          <SecondaryButton onPress={onPressField.bind(this, "PCSI")} buttonText="PCSI" />
          <SecondaryButton onPress={onPressField.bind(this, "MP")} buttonText="MP" />
          <SecondaryButton onPress={onPressField.bind(this, "PC")} buttonText="PC" />          
          <SecondaryButton onPress={onPressField.bind(this, "PT")} buttonText="PT" />
          <SecondaryButton onPress={onPressField.bind(this, "TPC")} buttonText="TPC" />
        </View>
        <View style={styles.ButtonColumnContainer}>
          <SecondaryButton onPress={onPressField.bind(this, "MP2I")} buttonText="MP2I" />
          <SecondaryButton onPress={onPressField.bind(this, "PTSI")} buttonText="PTSI" />
          <SecondaryButton onPress={onPressField.bind(this, "MPI")} buttonText="MPI" />
          <SecondaryButton onPress={onPressField.bind(this, "PSI")} buttonText="PSI" />          
          <SecondaryButton onPress={onPressField.bind(this, "TSI")} buttonText="TSI" />
          <SecondaryButton onPress={onPressField.bind(this, "Autre")} buttonText="Autre" />
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: Colors.blue400,
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "90%",
    // borderWidth: 1,
    // borderRadius: 45,

  },
  questionContainer: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: Colors.white,
    // borderRadius: 15,
    // paddingVertical: 3,
    
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    // flex: 1,
    height: "80%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    flexDirection: "row",
  },
  ButtonColumnContainer: {
    width: "50%", 
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    // borderWidth: 1,
  },
 
});