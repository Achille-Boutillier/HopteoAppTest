import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constant/Colors";

const orange500 = Colors.orange500;

function PrimaryButton({onPress, name, size, color = { orange500 }, bigButton, style,}) {
  const verticalHitSlop = bigButton ? 25 : 15; // size + 20 pour une meilleure cliquabilité

  return (
    <TouchableOpacity 
      style={[ styles.buttonContainer, style]} 
      onPress={onPress}
      hitSlop={{top: verticalHitSlop, bottom: verticalHitSlop, left: 15, right: 15}}

    >
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "center",
    // borderWidth: 1,
    // flex: 1
  },
});
