import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, } from "react-native";
import { Colors } from "../../constant/Colors";
// import SecondaryButton from "../SecondaryButton";

export default function OptionComponent({optionSynthese, optionDetail}) {
  const [isPressed, setIsPressed ] = useState(false);
  const [optionToSchow, setOptionToSchow] = useState();
  const [buttonName, setButtonName] = useState();


  function onPress(){
    setIsPressed(bool => !bool)
  }
  
  useEffect(() => {
    if (isPressed) {
      setOptionToSchow(optionDetail);
      setButtonName("Voir la synthèse");

    } else {
      setOptionToSchow(optionSynthese);
      setButtonName("Voir le détail");
    } 
  }, [isPressed])

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}> 
      <Text style={styles.textStyle} >{optionToSchow}</Text>

      <View style={styles.buttonContainer} >
        <Text style={styles.textStyle}>{buttonName}</Text>
      </View>

    </TouchableOpacity>
  );

return 
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.orange100,
    width: "70%",
    borderRadius: 10,
    paddingHorizontal: "3%",
    // marginBottom: 50,
    paddingVertical: 10,
  },

  textStyle: {
    // textAlign: "center", 
    color: Colors.grey, 
    fontWeight: "600",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 3,
    backgroundColor: Colors.orange100,
    marginTop: 10,
    // borderWidth: 1,
    
  },

});
