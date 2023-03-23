import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../constant/Colors";


const levelColor = Colors.white;

function ScoreBar({score, mainBarColor, progressBarColor , globalScore, hideScoreNumber, borderColor }) {   // globalScore = true ou false
  const scoreInteger = parseInt(score)
  const scorePourcent = scoreInteger.toString() + "%";
  const numberLimit = globalScore ? 10 : 30;

  const barText = (
    <Text style={[styles.scoreStyle, { fontSize: globalScore ? 14 : 12 }]}>
      {scorePourcent}
    </Text>
  );

  const shadowStyle = {
    // elevation: 5,
    // borderWidth: 0.6,
    // borderWidth: 1,
    borderColor: borderColor,
  }

  return (
    <View
      style={[
        styles.mainBar,
        {
          backgroundColor: mainBarColor,
          width: globalScore ? "76%" : "100%",
          height: globalScore ? "3%" : "100%",
        },
        hideScoreNumber ? shadowStyle : null

      ]}
    >
      <View
        style={[
          styles.progressBar,
          { backgroundColor: progressBarColor, width: scorePourcent },
        ]}
      >
        {(!(hideScoreNumber) && (scoreInteger >= numberLimit)) ? barText : null}
      </View>
      
        {(!(hideScoreNumber) && (scoreInteger < numberLimit)) ? barText : null}
    </View>
  );
}

export default ScoreBar;

const styles = StyleSheet.create({
  mainBar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",

  },
  scoreStyle: {
    color: Colors.white,
    marginLeft: "8%",
  },

});
