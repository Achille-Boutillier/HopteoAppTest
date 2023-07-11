import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
// import { Colors } from "../../constant/Colors";
// import SingleChip from "./SingleChip";
import FilterPopup from "../popup/FilterPopup";
import SeveralChip from "./SeveralChip";


export default function ScrollableChipingLine({nameList, onPress, activeFilterNameList}) {

  
  return (
    <>
      <ScrollView contentContainerStyle={styles.mainContainer} horizontal showsHorizontalScrollIndicator={false}>
        {/* {sortedTitleList.map((item, index)=>
          <SingleChip 
            key={index} 
            onPress={onPress}
            isPressable={true}
            isSelected ={activeFilterNameList.includes(item)}
            // style={}
          > //todo : creer un composant intermédiaire nommé "filterComponent" entre rankingHeader et scrollableChipingLine, déplacer FilterPopup dedans et toute la logique du clickage
            {item}
          </SingleChip>
        )} */}
        <SeveralChip
          chipingList={nameList}
          onPress={onPress}
          isPressable={true}
          selectedList={activeFilterNameList}
        />
      </ScrollView>
      {/* <FilterPopup isPopupVisible={isFilterPopupVisible} onClose={onFilterClose} filterName={currentSelectedName}/> */}
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
