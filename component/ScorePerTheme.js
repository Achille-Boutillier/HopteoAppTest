import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../constant/Colors";
import ScoreBar from "./ScoreBar";

function ScorePerTheme({ themeName, themeColor, score }) {
  let progressColorString = themeName.toLowerCase() + "500";

  return (
    <View style={styles.mainContainer}>
      <View style={styles.themeNameContainer}>
        <Text>{themeName}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <ScoreBar
          score={score}
          mainBarColor={themeColor}
          progressBarColor={themeColor}
        />
      </View>
    </View>
  );
}

export default ScorePerTheme;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-between",
    backgroundColor: Colors.blue400,
    borderRadius: 10,
    width: "26%",
    marginHorizontal: "1%",
    marginBottom: "4%",
    overflow: "hidden"
  },
themeNameContainer: {
    height: "65%",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreContainer: {
    height: "35%",
  }
});
