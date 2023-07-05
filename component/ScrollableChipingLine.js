import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Colors } from "../constant/Colors";
import SingleChip from "./SingleChip";
import FilterPopup from "./popup/FilterPopup";


export default function ScrollableChipingLine({titleList}) {
 
  const [pressedName, setPressedName] = useState("");
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  function onPress(pressedItem) {
    setPressedName(pressedItem);
    setIsFilterPopupVisible(true);
  }

  function onFilterClose() {
    setIsFilterPopupVisible(false);
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.mainContainer} horizontal showsHorizontalScrollIndicator={false}>
        {titleList.map((item, index)=>
          <SingleChip 
            key={index} 
            onPress={onPress}
            isPressable={true}
          >
            {item}
          </SingleChip>
        )}
      </ScrollView>
      <FilterPopup isPopupVisible={isFilterPopupVisible} onClose={onFilterClose} filterName={pressedName}/>
    </>

  );
};

const styles = StyleSheet.create({

  mainContainer:{
    flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "center",
    alignItems: "center",
    paddingVertical: "2%",
    overflow: "hidden",
  },

});
