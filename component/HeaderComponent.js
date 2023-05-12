import { View } from "react-native";
import { StyleSheet } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constant/Colors";

export default function HeaderComponent({}) {

  const navigation = useNavigation();

  function onBackPress() {
    navigation.goBack();
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.backButtonContainer}>
        <PrimaryButton
          onPress={onBackPress}
          name="arrow-back"
          size={28}
          color={Colors.orange500}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    width: "100%",
    paddingHorizontal: "6%",
    // borderWidth: 1,
  },

  backButtonContainer: {
    // position: "absolute",
    // left: "6%",
  },

});
