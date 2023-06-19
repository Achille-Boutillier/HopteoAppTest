import { View } from "react-native";
import { StyleSheet } from "react-native";
import PrimaryButton from "./buttons/PrimaryButton";
// import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constant/Colors";
import { BrandComponent } from "./TopBar";

export default function HeaderComponent({onBackPress}) {

  // const navigation = useNavigation();

  // function onBackPress() {
  //   navigation.goBack();
  // }

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
      <BrandComponent style={{marginVertical: "5%"}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    // marginLeft: "6%",
    // marginTop: "3%",
    // paddingHorizontal: "6%",
    // borderWidth: 1,
  },

  backButtonContainer: {
    // borderWidth: 1,
    left: "8%",
    // marginTop: "5%",
    // marginLeft: "6%",
    position: "absolute",
    // left: "6%",
  },

});
