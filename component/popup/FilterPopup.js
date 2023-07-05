import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import BottomPopup from './BottomPopup';


export default function FilterPopup({ isPopupVisible, onClose, filterName }) {
  // todo : set le contenu du filtre

  return (
    <BottomPopup isPopupVisible={isPopupVisible} onClose={onClose}>
    </BottomPopup>
  );
};

const styles = StyleSheet.create({
 
});

