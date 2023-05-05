import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Colors } from '../constant/Colors';

export default function Chip({children}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
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