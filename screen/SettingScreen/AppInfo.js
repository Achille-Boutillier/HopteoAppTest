import { useState, useEffect } from "react";

import { StyleSheet, View, Text, TouchableOpacity, Linking} from "react-native";
import PrimaryButton from "../../component/PrimaryButton";
import SecondaryButton from "../../component/SecondaryButton";



import {Colors} from "../../constant/Colors";
import { getPrivacyPolicy } from "../../BackEnd/controllers/setting";
import { alertProvider } from "../../BackEnd/errorHandler";
import TerciaryButton from "../../component/TerciaryButton";



export default function AppInfo({navigation, route}) {
  const appInfo = route.params?.appInfo

  async function onPressPolicy() {
    navigation.navigate('Privacy Policy');
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer} >
        <PrimaryButton 
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={28}
          color={Colors.orange500}
        />
        {/* <Text style={{}}>A propos d'Hopteo</Text> */}
      </View>
        { appInfo ? (
          <View style={styles.bodyContainer}>
            <Text style={styles.titleText}>A propos d'Hopteo :</Text> 
            <Text style={styles.infoText}>{appInfo?.description}</Text>
            
            <View style={styles.websiteContainer}>
              <Text style={styles.titleText}>Site web :</Text>
              <TouchableOpacity onPress={() => Linking.openURL(appInfo.webSite)}>
                <Text style={styles.websiteText}>hopteo.com</Text>
              </TouchableOpacity>
              
            </View>
    
            <View style={{width: "80%", alignSelf: "center"}} >
              {/* <SecondaryButton
                onPress={onPressPolicy}
                buttonText = "Politique de Confidentialité"
                fontSize={15}
                preSized={false}
              /> */}
              <TerciaryButton
              title = "Politique de Confidentialité"
              onPress={onPressPolicy}
              color={Colors.orange500}
              isFullColor={true}
              fontSize={15}
              />
            </View>
          </View>

        ) : <Text style={[styles.infoText]}>{"Erreur de chargement..."}</Text>

        }
        

    </View>
  );
}



const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 40,
    paddingLeft: "6%",
    marginTop: "1%",
  },
  bodyContainer: {
    flex: 1,
    // alignItems:"center",
    padding: "5%",
  },
  titleText: {
    fontSize: 18, 
    fontWeight: "500", 
    // marginBottom: 20, 
    // textAlign: "center"
  },

  infoText: {
    fontSize: 15, 
    textAlign: "justify", 
    marginVertical: 20,
  },
  websiteContainer: {
    marginBottom: "10%",
    flexDirection: "row",
    alignItems: "flex-end",
    // justifyContent: "space-evenly",
    width: "100%",
  },
  websiteText: {
    fontSize: 17, 
    fontWeight: "500", 
    color: Colors.orange500, 
    paddingLeft: 10,
    textDecorationLine: "underline",
  }

 
});