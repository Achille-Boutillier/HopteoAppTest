import { StyleSheet, View, Text} from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../../../constant/Colors";



export default function FigureComponent({field, admission, currentParcours, isAccessible }) {




  return (
    <>
      <View style={styles.leftContainer}>
        <View style={styles.fieldContainer}>
          <Text
            style={styles.figureText}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            {field}
          </Text>
        </View>
      </View>

      { isAccessible 
        ? (
          <>
            <View style={styles.middleContainer}>
              <Text style={styles.subTitle}>Rang médian</Text>
              <Text style={styles.subTitle}>Places</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.figureText}>
                {admission[field][currentParcours]
                  ? admission[field][currentParcours].rangMedian
                  : "-"}
              </Text>
              <Text style={styles.figureText}>
                {admission[field][currentParcours]
                  ? admission[field][currentParcours].nombrePlace
                  : "-"}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.notAccessibleContainer}>
            <Text style={styles.subTitle}>Inaccessible</Text>
          </View>
        )
        
      }
    </>
  );
}

const styles = StyleSheet.create({

  leftContainer: {
    // borderWidth: 1,
    width: "27%",
    // height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 5,
  },
  middleContainer: {
    // borderWidth: 1,
    width: "46%",
    // height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  rightContainer: {
    // borderWidth: 1,
    width: "27%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  subTitle: {
    color: Colors.grey,
    fontWeight: "500",
    fontSize: 14,
    textTransform: "capitalize",
    textAlign: "center",
    verticalAlign: "middle",
    // borderWidth: 1,
  },

  fieldContainer: {
    backgroundColor: Colors.blue400,
    borderRadius: 10,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  figureText: {
    color: Colors.smoothBlack,
    fontWeight: "700",
    fontSize: 14,
    // textAlign: "center",
    verticalAlign: "middle",
  },
  notAccessibleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "10%",
    // borderWidth: 1,
  }
});
