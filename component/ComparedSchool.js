import { StyleSheet, Text, View} from "react-native";
import { useEffect, useState } from "react";

// import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../constant/Colors";
import PrimaryButton from "./PrimaryButton";



export default function ComparedSchool({oneSchoolData}) {      
 console.log("okkkkkk ---------------------")  
console.log(oneSchoolData);

  return (
    <View style={styles.schoolContainer}>
        <Text>{oneSchoolData?.nomEcole}</Text>
        <Text style={styles.textStyle} >{oneSchoolData?.concours}</Text>
        <Text style={styles.textStyle}>{oneSchoolData?.fraisScolarite} {" €/an"}</Text>
        <Text style={styles.textStyle} >{oneSchoolData?.optionsSynthese}</Text>
        

    </View>
  );
  
}

const styles = StyleSheet.create({
    schoolContainer: {
        // flex: 0.1,
        width: "15%",
        height: "70%",
        backgroundColor: Colors.white,
        borderRadius: 10,
        margin: 10,
        alignItems: "center",
        borderWidth: 1,

    },
    textStyle: {
        textAlign: "center",
    },
});