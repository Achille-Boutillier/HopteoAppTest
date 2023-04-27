import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, } from "react-native";
import { Colors } from "../../constant/Colors";
import Chip from "../Chip";
// import SecondaryButton from "../SecondaryButton";

export default function OptionComponent({optionSynthese, optionDetail}) {
  const [isPressed, setIsPressed ] = useState(false);
  const [optionToSchow, setOptionToSchow] = useState([]);
  const [buttonName, setButtonName] = useState();

  function onPress(){
    setIsPressed(bool => !bool)
  }
  
  useEffect(() => {
    if (isPressed) {
      // console.log(optionDetailList)
      setOptionToSchow(optionDetail);
      // setOptionToSchow(["test1", "test2"]); //todo: request optionDetail
      // setButtonName("Voir la synthèse");

    } else {
      setOptionToSchow(optionSynthese);
      // setOptionToSchow(optionSynthese);
      setButtonName("Voir le détail");
      console.log(optionSynthese);

    } 
  }, [isPressed])

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}> 
      {/* <Text style={styles.textStyle} >{optionToSchow}</Text> */}
      <View style={styles.chipContainer}>
        {optionToSchow.map((item, index)=>
          <Chip key={index} >{item}</Chip>
          )
        }
      </View>

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
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: "3%",
    // marginBottom: 50,
    paddingVertical: 10,
  },

  chipContainer:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
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
