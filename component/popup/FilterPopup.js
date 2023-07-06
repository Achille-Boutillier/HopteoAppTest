import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Modal from "react-native-modal";
import BottomPopup from './BottomPopup';
import SingleChip from '../SingleChip';
import { Colors } from '../../constant/Colors';


export default function FilterPopup({ isPopupVisible, onClose, filterName }) {
  // todo : set le contenu du filtre
  const [filterList, setFilterList] = useState([""]);
  // const [isActive, setIsActive] = useState(false);
  useEffect(()=>{
    let list
    switch (filterName) {
      case "Concours":
        list = ["filter1", "filter2", "filter3", "filter4", "filter5", "filter6", "filter7"];
        break;
      case "Formation":
        list = ["filter1", "filter2", "filter3", "filter4", "filter5", "filter6", "filter7"];
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

  return (
    <BottomPopup isPopupVisible={isPopupVisible} onClose={onClose}>
      <View style={styles.modalTitle}>
        <Text style={styles.modalTitleText}>{`Filtrer par ${filterName.toLowerCase()}`}</Text>
      </View>
      <View style={{flex: 1, justifyContent: "center"}} >
        <View style={styles.chipContainer}>
          {filterList.map((item, index)=>
            <SingleChip key={index} style={{backgroundColor: Colors.grey300}}>{item}</SingleChip>
            )
          }
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

