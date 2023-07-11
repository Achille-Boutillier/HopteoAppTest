import FilterPopup from "./popup/FilterPopup";
import ScrollableChipingLine from "./ChipComponents/ScrollableChipingLine";
import { useState, useEffect } from "react";

export default function FilterComponent({filterSectionList}) {

  const [sortedTitleList, setSortedTitleList] = useState(filterSectionList);
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


  return(
    <>
      <ScrollableChipingLine nameList={filterSectionList} onPress={onPress} activeFilterNameList={activeFilterNameList}/>
      <FilterPopup isPopupVisible={isFilterPopupVisible} onClose={onFilterClose} filterName={currentSelectedName}/>
    </>
  );
}