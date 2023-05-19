import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { Colors } from '../constant/Colors';

export default function ActivityComponent() {
    return (
      <View style={styles.mainContainer}>
        <ActivityIndicator color={Colors.orange500} size={"large"}/>
      </View>
    );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',    // transparence du background
  },
});