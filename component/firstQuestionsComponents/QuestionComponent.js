import { View, StyleSheet, Text, Button, TextInput, ScrollView, ActivityIndicator } from "react-native";
// import { useState, useEffect } from "react";

// import { Colors } from "../../constant/Colors";
import SecondaryButton from "../buttons/SecondaryButton";
import ActivityComponent from "../ActivityComponent";
// import { useSelector } from "react-redux";

export default function QuestionComponent({ onPressField, question, buttonList }) {

  
  // const leftField = buttonList.slice(0, Math.round(buttonList.length/2));
  // const rightField = buttonList.slice(Math.round(buttonList.length/2), buttonList.length);
  // const test = ["hahaha1", "hahaha2", "hahaha3", "hahaha4", "hahaha5", "hahaha6", "hahaha7", "hahaha8", "hahaha9", "hahaha10", "hahaha11"]

  return (
    <View style={styles.mainContainer}> 

      <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} >


      <View style={styles.questionContainer}>
        <Text style={styles.textStyle}>
          {question}
        </Text>
      </View>


      {buttonList ?  (
        <View style={styles.buttonContainer}>
          {buttonList.map( (item) => {
              return <SecondaryButton key={item} onPress={onPressField.bind(this, item)} buttonText={item} />
            }
          )}
          
        </View>
      ) : <ActivityComponent/> }

      </ScrollView>

    </View>

  );
}


const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    // justifyContent: "space-around",
    // width: "100%",
    // flex: 1,
    // borderWidth: 1
  },
  questionContainer: {
    // width: "70%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
    paddingHorizontal: 10,
    // borderWidth: 1
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: "15%",
    // flexDirection: "row",
  },
  ButtonColumnContainer: {
    width: "50%", 
    alignItems: "center",
    marginVertical: 10,
    // flex: 1,
    // borderWidth: 1,
  },
 
});