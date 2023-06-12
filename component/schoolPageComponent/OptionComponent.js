import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, } from "react-native";
import { Colors } from "../../constant/Colors";
import Chip from "../Chip";
import TerciaryButton from "../buttons/TerciaryButton";
// import SecondaryButton from "../SecondaryButton";

export default function OptionComponent({optionSynthese, optionDetail}) {
  const [isPressed, setIsPressed ] = useState(false);
  const [optionToSchow, setOptionToSchow] = useState([]);
  const [buttonName, setButtonName] = useState();
  const [title, setTitle] = useState("");

  function onPress(){
    setIsPressed(bool => !bool)
  }
  
  useEffect(() => {
    if (isPressed) {
      // console.log(optionDetailList)
      setOptionToSchow(optionDetail);
      // setOptionToSchow(["test1", "test2"]); //todo: request optionDetail
      setButtonName("Voir la synthèse");
      setTitle("Détail")

    } else {
      setOptionToSchow(optionSynthese);
      // setOptionToSchow(optionSynthese);
      setButtonName("Voir le détail");
      setTitle("Synthèse")
      // console.log(optionSynthese);

    } 
  }, [isPressed])

  return (
    <View style={styles.mainContainer} > 
      <Text style={styles.textStyle} >{title}</Text>
      <View style={styles.chipContainer}>
        {optionToSchow.map((item, index)=>
          <Chip key={index} >{item}</Chip>
          )
        }
      </View>

      <TerciaryButton title = {buttonName} onPress={onPress} color ={Colors.orange500} isFullColor={!isPressed} fontSize={15} />

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1.5,
    // borderColor: Colors.orange500,
    backgroundColor: Colors.grey300,
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: "3%",
    // marginBottom: 50,
    paddingTop: 10,
    paddingBottom: 20,
  },

  chipContainer:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
  },

  textStyle: {
    // textAlign: "center", 
    // color: Colors.blackTextColor,  
    textDecorationLine: 'underline' ,
    color: Colors.grey,  
    fontWeight: "600",
    fontSize: 15,
  },

});
