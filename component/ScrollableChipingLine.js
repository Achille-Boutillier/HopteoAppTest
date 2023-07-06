import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Colors } from "../constant/Colors";
import SingleChip from "./SingleChip";
import FilterPopup from "./popup/FilterPopup";


export default function ScrollableChipingLine({titleList}) {

  const [sortedTitleList, setSortedTitleList] = useState(titleList);
  const [currentSelectedName, setCurrentSelectedName] = useState("");
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const [activeFilterNameList, setActiveFilterNameList ] = useState([]);

// ------------- sort titleList ----------------
  function sortedFunction(list) {
    let newList = list.slice();
    newList.sort((a, b) => {
      const isActiveA = activeFilterNameList.includes(a);
      const isActiveB = activeFilterNameList.includes(b);
    
      if (isActiveA !== isActiveB) {
        return isActiveA ? -1 : 1; // put the active element in first
      }
      return 0; // save initial position
    });
    console.log("[newList]", newList);

    return newList;
  }

  useEffect(()=> {
    if (activeFilterNameList.length>0) {
      
      setTimeout(() => {
        setSortedTitleList((list)=>sortedFunction(list))
      }, 300);
      console.log("[activeFilterNameList]", activeFilterNameList);
      
    }
  }, [activeFilterNameList])


// ---------- fin sort ----------------


// ---- chip pressed ------------------------

  function onPress(pressedItem) {
    setCurrentSelectedName(pressedItem);
  }

  function onFilterClose() {
    // if (!isActive) {
      // const index = activeFilterNameList.indexOf(currentSelectedName);
      // console.log(currentSelectedName);
      // console.log(index)
      // if (index > -1) {

    setActiveFilterNameList((list)=>list.filter(item => item !== currentSelectedName));
      // }
    // }
    setIsFilterPopupVisible(false);
    setCurrentSelectedName("");   // reset the state
  }

  useEffect(()=> {
    if (currentSelectedName.length>0) {
      const newActiveFilterNameList = [...activeFilterNameList, currentSelectedName] ;
      setActiveFilterNameList([...new Set(newActiveFilterNameList)]); // suppress redundent items
      setIsFilterPopupVisible(true);
    
    }
  }, [currentSelectedName])

  // ------- fin chip pressed -----------------------------------

  
  return (
    <>
      <ScrollView contentContainerStyle={styles.mainContainer} horizontal showsHorizontalScrollIndicator={false}>
        {sortedTitleList.map((item, index)=>
          <SingleChip 
            key={index} 
            onPress={onPress}
            isPressable={true}
            isSelected ={activeFilterNameList.includes(item)}
            // style={}
          >
            {item}
          </SingleChip>
        )}
      </ScrollView>
      <FilterPopup isPopupVisible={isFilterPopupVisible} onClose={onFilterClose} filterName={currentSelectedName}/>
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
