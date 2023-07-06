import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Colors } from '../constant/Colors';

export default function SingleChip({children, isPressable, onPress, style={}, isSelected}) {
  if (children) {     // empecher les bulles vides
    
    return (
      <TouchableOpacity 
        style={[styles.container, isSelected ? {borderWidth:1, borderColor: Colors.orange500}: null, style]} 
        onPress={()=>onPress(children)} 
        disabled={!isPressable}
      >
        <Text style={styles.title}>{children}</Text>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    // backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // marginRight: 10,
    margin: 4
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    // borderWidth: 1,
    textAlign: "auto",
    verticalAlign: "middle",
    color: Colors.grey,
  },
});