import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Modal from "react-native-modal";
import BottomPopup from './BottomPopup';
// import SingleChip from '../ChipComponents/SingleChip';
import { Colors } from '../../constant/Colors';
import SeveralChip from '../ChipComponents/SeveralChip';
import { useSelector, useDispatch } from 'react-redux';
import { setRankingFilters } from '../../core/reducers/forRankingReducer';


export default function FilterPopup({ isPopupVisible, onClose, filterName }) {
  
  // todo : relier le store redux des filtres au usestate de selectedFilterList
  const [filterList, setFilterList] = useState([""]);
  // const [isActive, setIsActive] = useState(false);
  const {rankIdList, schoolsData} = useSelector((state)=> state.schoolReducer);
  const [selectedFilterList, setSelectedFilterList] = useState([]);
  const dispatch = useDispatch();

  function getConcourFilters(){
    let list = [];


    return list
  }

  function getFormationFilters() {
    // let list = [];
    let typeFormations = rankIdList.map(schoolId => schoolsData[schoolId].typeFormation).flatMap(item => item.split(/,\s/));
    typeFormations = [...new Set(typeFormations)].sort();
    console.log(typeFormations);
    return typeFormations;
  }


  useEffect(()=>{
    let list
    switch (filterName) {
      case "Concours":
      list = getConcourFilters();
        // list = ["filter1", "filter2", "filter3", "filter4", "filter5", "filter6", "filter7"];
        break;
      case "Formation":
        list = getFormationFilters();
        // list = ["filter1", "filter2", "filter3", "filter4", "filter5", "filter6", "filter7"];
        break;
      case "Ville":
        list = ["filter1", "filter2", "filter3", "filter4", "filter5", "filter6", "filter7"];
        break;

      default:
        list = ["filter1", "filter2", "filter3", "filter4", "filter5", "filter6", "filter7"];
        break;
    }
    setFilterList(list);
  }, [filterName])


  // ----------- item pressed -------------------------

  function onItemPressed(item){
    let updatedList;
    if (selectedFilterList.includes(item)) {
      updatedList = selectedFilterList.filter((element) => element !== item);
    } else {
      updatedList = selectedFilterList.concat(item);
    }
    setSelectedFilterList(updatedList);
  }


  //------------------------------------------

  function handleClosing(){
    onClose();
    dispatch(setRankingFilters({filterName, selectedFilterList})) 
  }


  return (
    <BottomPopup isPopupVisible={isPopupVisible} onClose={handleClosing}>
      <View style={styles.modalTitle}>
        <Text style={styles.modalTitleText}>{`Filtrer par ${filterName.toLowerCase()}`}</Text>
      </View>
      <View style={{flex: 1, justifyContent: "center"}} >
        <View style={styles.chipContainer}>
          {/* {filterList.map((item, index)=>
            <SingleChip key={index} style={{backgroundColor: Colors.grey300}}>{item}</SingleChip>
            )
          } */}
          <SeveralChip
            chipingList={filterList}
            singleChipStyle={{backgroundColor: Colors.grey300}}
            isPressable={true}
            onPress={onItemPressed}
            selectedList={selectedFilterList}
          />
        </View>
      </View>
    </BottomPopup>
  );
};

const styles = StyleSheet.create({
 modalTitle: {
  alignItems: "center",
  // justifyContent: "",
 },
 modalTitleText: {
  fontSize: 16,
  fontWeight: "600",
 },
 chipContainer:{
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  // alignSelf: "center",
  // marginTop: "2%",
  // flex: 1,
  // borderWidth: 1,
},
});

