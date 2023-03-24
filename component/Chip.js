import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Colors } from '../constant/Colors';

const Chip = ({children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    // backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // marginRight: 10,
    margin: 2
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    // borderWidth: 1,
    textAlign: "auto",
    verticalAlign: "middle",
  },
});