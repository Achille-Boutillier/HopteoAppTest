// import { useState } from "react";
import {
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from "react-native";

import { Colors } from "../../constant/Colors";

export default function UserBacMean({bacMeanInputHandler, bacMean, nextPressed,}) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.questionContainer}>
        <Text style={styles.textStyle}>{"Quelle était ta moyenne au Bac ?"}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.bacMeanInput}
          maxLength={4}
          keyboardType="numeric"      // ! si pas de point sur ios, utiliser "decimal-pad"
          // autoCapitalize="none" //empêcher l'autocapitalisation ou autocorrection du phone
          // autoCorrect={false}
          onChangeText={bacMeanInputHandler}
          onSubmitEditing={nextPressed}
          value={bacMean}
          placeholder="exemple : 15.5"
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={nextPressed}>
          <Text style={styles.textStyle}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: Colors.blue400,
    alignItems: "center",
    justifyContent: "space-evenly",
    // justifyContent: "center",
    height: 250,
    width: "85%",
    // borderWidth: 1,
    // borderRadius: 45,
    // padding: 10,
  },
  questionContainer: {
    // width: "70%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: Colors.white,
    // borderRadius: 15,
    // paddingVertical: 5,
    // paddingHorizontal: 10,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    verticalAlign: "middle",
  },
  bottomContainer: {
    // flex: 1,
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    // marginTop: "5%",
    // flexDirection: "row",
  },
  bacMeanInput: {
    height: 40,
    width: "60%",
    backgroundColor: Colors.white,
    textAlign: "center",
    fontSize: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Colors.orange500,
    paddingVertical: 5,
    paddingHorizontal: 25,
    // height: 35,
    // width: "70%",
  },

  // // todo : a tej :
  // questionContainer: {
  //   flex: 0.3,
  //   width: "80%",
  //   alignItems: "center",
  //   justifyContent: "flex-end",
  //   alignSelf: "center",
  // },
  // textStyle: {
  //   fontSize: 22,
  //   fontWeight: "400",
  //   textAlign: "center",
  // },
  // bottomPart: {
  //   flex: 1,
  //   alignItems: "center",
  //   paddingTop: "20%",
  // },
  // buttonContainer: {
  //   borderRadius: 8,
  //   height: "60%",
  //   width: "80%",
  //   justifyContent: "space-evenly",
  //   alignItems: "center",
  //   backgroundColor: Colors.blue400,
  // },
});
