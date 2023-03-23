import { useEffect } from "react";
import { useState } from "react";
import { Dimensions ,View, StyleSheet, Text, Image } from "react-native";
import {Colors} from "../constant/Colors";
import PrimaryButton from "./PrimaryButton";
import Logo from "../assets/icons/logo.svg";

const buttonSize = 30;


export function BrandComponent() {
return (
  <View style={styles.brandContainer}>
    <Logo width={52} height={52} />
    {/* <Image
      source={require("../assets/images/newLogo.png")}
      style={{ height: 100, width: 100, borderWidth: 1 }}
    /> */}
    {/* <Image
      source={require("../assets/images/logo.png")}
      style={{ height: 30, width: 30 }}
    /> */}
    <Text style={styles.text}>Hopteo</Text>
  </View>
);
}


export function HeaderButton({onSettingsPress, onUndoPress, onManageSwipeButtonPressed}) {
  

  const manageButton = onManageSwipeButtonPressed ? (
    <PrimaryButton
      onPress={onManageSwipeButtonPressed}
      name="ellipsis-horizontal-outline"
      size={buttonSize}
      color={Colors.orange500}
    />
  ) : (
    null
  )
  
  const unDoButton = onUndoPress ? (
    <PrimaryButton
      onPress={onUndoPress}
      name="arrow-undo-circle-outline"
      size={buttonSize}
      color={Colors.orange500}
    />
  ) : (
    null
  )
  

    return (
      <View style={styles.rightHeaderContainer}>
        <View style={styles.buttonStyle}>
          {manageButton}
        </View>
  
        <View style={[styles.undoContainer, styles.buttonStyle]}>
          {unDoButton}
        </View>
        <View style={[styles.settingsContainer, styles.buttonStyle]}>
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
    flex: 1,
    // height: 
    marginLeft: "4%",
    // width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
  },
  text: {
    color: Colors.orange500,
    fontSize: 18,
    marginLeft: 15,
    // paddingLeft: 10,
    fontWeight: "bold",
  },
  rightHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: (Dimensions.get('window').width + buttonSize)/2,   // centrer le bouton manageButton : largeur totale/2 à laquelle on ajoute la moitié de la taille du bouton (30/2)
  },
  
  buttonStyle: {
    position: "absolute",
  },
  undoContainer: {
    position: "absolute",
    marginLeft: "35%",
  },
  settingsContainer: {
    position: "absolute",
    marginLeft: "68%",
  }

});