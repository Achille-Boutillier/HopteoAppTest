import { useEffect } from "react";
import { useState } from "react";
import { Dimensions, View, StyleSheet, Text, Image } from "react-native";
import { Colors } from "../constant/Colors";
import PrimaryButton from "./PrimaryButton";
import Logo from "../assets/icons/logo.svg";

const buttonSize = 30;

export function BrandComponent({marginLeft="4%", logoSize=52, fontSize=25}) {
  return (
    <View style={[styles.brandContainer, { marginLeft: marginLeft}]}>
      <Logo
        width={logoSize}
        height={logoSize}
      />
      <Text style={[styles.text, {fontSize: fontSize}]}>Hopteo</Text>
    </View>
  );
}

export function HeaderButton({
  onSettingsPress,
  onUndoPress,
}) {
  // const manageButton = onManageSwipeButtonPressed ? (
  //   <PrimaryButton
  //     onPress={onManageSwipeButtonPressed}
  //     name="ellipsis-horizontal-outline"
  //     size={buttonSize}
  //     color={Colors.orange500}
  //   />
  // ) : null;

  const unDoButton = onUndoPress ? (
    <PrimaryButton
      onPress={onUndoPress}
      name="arrow-undo-circle"
      size={buttonSize}
      color={Colors.orange500}
    />
  ) : null;

  return (
    <View style={styles.rightHeaderContainer}>
      {/* <View style={styles.buttonStyle}>{manageButton}</View> */}

      <View style={styles.undoContainer}>{unDoButton}</View>
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
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    // alignItems: "center",
  },
  text: {
    color: Colors.orange500,
    marginLeft: 10,
    // paddingLeft: 10,
    fontWeight: "bold",
  },
  rightHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: (Dimensions.get("window").width + buttonSize) / 2, // centrer le bouton manageButton : largeur totale/2 à laquelle on ajoute la moitié de la taille du bouton (30/2)
  },

  // buttonStyle: {
  //   position: "absolute",
  // },
  undoContainer: {
    position: "absolute",
    marginLeft: "35%",
  },
  settingsContainer: {
    position: "absolute",
    marginLeft: "68%",
  },
});
