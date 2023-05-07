import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../constant/Colors";


const levelColor = Colors.white;

function ScoreBar({score, mainBarColor, progressBarColor }) {   // globalScore = true ou false
  const scoreInteger = parseInt(score);
  const scorePourcent = scoreInteger.toString() + "%";
  
  return (
    <View
      style={[
        styles.mainBar, {backgroundColor: mainBarColor},
      ]}
    >
      <View style={[styles.progressBar, { backgroundColor: progressBarColor, width: scorePourcent },]} >
        
      </View>
      
    </View>
  );
}

export default ScoreBar;

const styles = StyleSheet.create({
  mainBar: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    height: "80%",
    marginHorizontal: "1%",
    // overflow: "hidden",
    // borderWidth: 1,
  },
  progressBar: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10


  },

});
