import { useEffect, useState } from "react";
import { StyleSheet, View, Text, } from "react-native";
import { Colors } from "../../constant/Colors";
import SingleChip from "../SingleChip";
import TerciaryButton from "../buttons/TerciaryButton";

export default function ChipingSection({firstData, secondData}) {
  const [isPressed, setIsPressed ] = useState(false);

  // const [optionToSchow, setOptionToSchow] = useState([]);
  // const [buttonName, setButtonName] = useState();
  // const [title, setTitle] = useState("");

  const [sectionData, setSectionData] = useState(["", [], ""]);

  function onPress(){
    setIsPressed(bool => !bool)
  }
  
  useEffect(() => {
    if (isPressed) {
      // // console.log(optionDetailList)
      // setOptionToSchow(optionDetail);
      // // setOptionToSchow(["test1", "test2"]); //todo: request optionDetail
      // setButtonName("Voir la synthèse");
      // setTitle("Détail")
      setSectionData(secondData);
    } else {
      // setTitle(firstData[0])
      // setOptionToSchow(firstData[1]);
      // setButtonName(firstData[2]);

      setSectionData(firstData);
    } 
  }, [isPressed])

  return (
    <View style={styles.mainContainer} > 
      <Text style={styles.textStyle} >{sectionData[0]}</Text>
      <View style={styles.chipContainer}>
        {sectionData[1].map((item, index)=>
          <SingleChip key={index}>{item}</SingleChip>
          )
        }
      </View>

      { secondData 
      ? <TerciaryButton title = {sectionData[2]} onPress={onPress} color ={Colors.orange500} isFullColor={!isPressed} fontSize={15} />
      : null
      }
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
    marginBottom: 20,
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
