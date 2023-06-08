import { useEffect } from "react";
import { useState } from "react";
import { Dimensions, View, StyleSheet, Text, Image } from "react-native";
import { Colors } from "../constant/Colors";
import PrimaryButton from "./buttons/PrimaryButton";
import Logo from "../assets/icons/logo.svg";

const buttonSize = 30;

const logoAndNameWidth = 130;

export function BrandComponent({marginLeft="4%", logoSize=52, fontSize=25}) {
  return (
    <View style={[styles.brandContainer, { marginLeft: marginLeft}]}>
      {/* <View style={styles.imageContainer}> */}
      {/* <Logo
        width={logoSize}
        height={logoSize}
      />
      <Text style={[styles.text, {fontSize: fontSize}]}>Hopteo</Text> */}
      <Image source={require('../assets/logo/logoAndName.png')} style={styles.image} />
      {/* </View> */}
    </View>
  );
}

export function HeaderButton({onSettingsPress}) {
  
  return (
    <View style={styles.rightHeaderContainer}>

      <View style={styles.settingsContainer}>
        <PrimaryButton
          onPress={onSettingsPress}
          name="settings-sharp"
          size={buttonSize}
          color={Colors.orange500}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  brandContainer: {
    // flex: 1,
    marginLeft: "4%",
    // flexDirection: "row",
    // alignItems: "center",
    // borderWidth: 1,
    // alignItems: "center",
  },
  text: {
    color: Colors.orange500,
    marginLeft: 10,
    // marginRight: 10, //cause logo has margin => help to center the brand component
    fontWeight: "bold",
  },

  // imageContainer: {
  //   width: 100,

  // },
  image: {
    // flex: 1,
    width: logoAndNameWidth+1,
    height: logoAndNameWidth*171/835,
    // borderWidth: 1,
    // aspectRatio: 1,
  },

  // --------------------------------------

  rightHeaderContainer: {
    // borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // width: (Dimensions.get("window").width + buttonSize) / 2, // centrer le bouton manageButton : 
    width: (Dimensions.get("window").width ) / 2, 
  },

  
  settingsContainer: {
    position: "absolute",
    right: 30,
    // marginLeft: "68%",

  },
});
