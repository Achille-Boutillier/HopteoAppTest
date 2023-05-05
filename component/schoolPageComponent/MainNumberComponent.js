import { StyleSheet, View, Text, } from "react-native";
import { Colors } from "../../constant/Colors";
import OneNumber from "./OneNumber";

export default function MainNumberComponent({ moyenneBac, salaireMoyen, fraisScolarite}) {

  
  return (
    <View style={styles.mainContainer}>

      <OneNumber
        number={moyenneBac}
        numberName="MOYENNE BAC"
        width="26%"
      />
          
      <View style={styles.separation} />
      
      <OneNumber
        number={`${salaireMoyen} €/an`}
        numberName="SALAIRE MOYEN SORTIE"
        width="45%"

      />
          
      <View style={styles.separation} />

      <OneNumber
        number={`${fraisScolarite} €`}
        numberName={"COÛT ANNUEL \n (non boursier)"}
        width="26%"
      />
      
       

    </View>
  );

return 
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "90%",
    height: 60,
    borderRadius: 10,
    backgroundColor: Colors.blue400,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 25,
  },

  separation:{
    width: 1,
    height: "75%",
    backgroundColor: Colors.smoothBlack,
  },

  fieldContainer: {
    backgroundColor: Colors.blue400,
    borderRadius: 10,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  numberText: {
    color: Colors.smoothBlack ,
    fontWeight: "700",
    fontSize: 14,
    // textAlign: "center",
    verticalAlign: "center",
  },


});
