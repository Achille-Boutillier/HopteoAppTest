import { View, StyleSheet, Text, Button, TextInput, ScrollView } from "react-native";
// import { useState, useEffect } from "react";

import { Colors } from "../../constant/Colors";
import SecondaryButton from "../buttons/SecondaryButton";
import { useSelector } from "react-redux";

export default function QuestionComponent({ onPressField, question, buttonList }) {

  
  // const leftField = buttonList.slice(0, Math.round(buttonList.length/2));
  // const rightField = buttonList.slice(Math.round(buttonList.length/2), buttonList.length);


  return (
    <View style={styles.mainContainer}> 

      {/* <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} > */}


      <View style={styles.questionContainer}>
        <Text style={styles.textStyle}>
          {question}
        </Text>
      </View>


      <View style={styles.buttonContainer}>
        {buttonList.map( (item) => {
            return <SecondaryButton key={item} onPress={onPressField.bind(this, item)} buttonText={item} />
          }
        )}
        {/* <View style={styles.ButtonColumnContainer}>
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
        </View> */}
      </View>
      
      {/* <SecondaryButton onPress={onPressField.bind(this, "Autre")} buttonText="Autre" preSized={false}/> */}

      {/* </ScrollView> */}

    </View>

  );
}


const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    width: "90%",
    // padding: 10,
    borderWidth: 1,
    flex: 1,
    // justifyContent: "center",
    // width: "90%",
  },
  questionContainer: {
    // width: "70%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 10,
    // borderWidth: 1
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    borderWidth: 1,
    // flex: 1,
    // width: "95%",
    marginTop: "5%",
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