

import { View, StyleSheet, Text,  } from "react-native";
import { Colors } from "../../constant/Colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleShowRankingPopup } from "../../core/reducers/forRankingReducer";
import PrimaryButton from "../buttons/PrimaryButton";


export default function InfoPopup({message}) {  

const dispatch = useDispatch();

  return (
    <View style={styles.main}>


      <View style={styles.body}>
        <Text style={styles.messageText}>{message}</Text>
      </View>

      <View style={styles.crossContainer}>
        {/* <Text style={styles.headerText}> Attention !</Text> */}
        <PrimaryButton
          onPress={()=>dispatch(toggleShowRankingPopup())}
          name="close-outline"
          size={20}
          color={Colors.orange500}
        />
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  main: {
    marginTop: "3%",
    width: "90%",
    backgroundColor: Colors.white,
    // backgroundColor: Colors.orange100,
    // backgroundColor: Colors.grey300,
    alignSelf: "center",
    flexDirection:"row",
    borderRadius: 3,
  },

  
  body: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "3%",
    paddingLeft: "2%",
    width: "94%",
  },

  messageText: {
    textAlign: "justify",
    fontSize: 15,
  },

  crossContainer: {
    position: "absolute",
    right: 0,
    top: 0,
  },

 
});
