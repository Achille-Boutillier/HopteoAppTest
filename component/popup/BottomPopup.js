import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";


export default function BottomPopup({ isPopupVisible, onClose }) {

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
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.popup}>

          {/* Barre horizontale indiquant que la fenêtre est déroulable */}
          <View style={styles.scrollIndicator} />

          {/* Contenu de votre popup */}
          <Text>Contenu du popup</Text>

          {/* Bouton de fermeture */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,

  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#fff',
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
  closeButton: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
  },
  closeButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

