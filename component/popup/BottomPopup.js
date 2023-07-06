import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import { Colors } from '../../constant/Colors';


export default function BottomPopup({ isPopupVisible, onClose, children, modalContentStyle }) {

  return (
    <Modal 
      isVisible={isPopupVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      onSwipeComplete={onClose}
      // onBackdropPress={onClose}
      swipeDirection={['down']}
      style={styles.modalComponentStyle}
    >
      <View style={styles.innerModal}>

        {/* Barre horizontale indiquant que la fenêtre est déroulable */}
        <View style={styles.scrollIndicator} />

        <View style={[styles.modalContent, modalContentStyle]}>
          {children}
        </View>
    

        {/* Bouton de fermeture */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalComponentStyle: {
    justifyContent: 'flex-end',
    margin: 0,

  },
  
  innerModal: {
    height: "70%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  scrollIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 2,
  },
  modalContent: {
    flex: 1,
    paddingVertical: "5%",
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
  },
  closeButtonText: {
    color: Colors.orange500,
    fontWeight: 'bold',
  },
});

