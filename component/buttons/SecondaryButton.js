import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../constant/Colors";

function SecondaryButton({onPress, buttonText, fontSize=25, preSized=true}) {
  

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={[styles.textStyle, {fontSize: fontSize}]}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    backgroundColor: Colors.white,
    // borderWidth: 1,
    
  },
  textStyle: {
    textAlign: "center",
    verticalAlign: "middle",
    // fontSize: "1rem",
    // borderWidth: 1,
    // color: Colors.white,
  },
});
