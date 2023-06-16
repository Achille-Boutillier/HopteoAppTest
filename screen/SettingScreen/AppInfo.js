// import { useState, useEffect } from "react";

import { StyleSheet, View, Text, TouchableOpacity, Linking, ScrollView} from "react-native";
import PrimaryButton from "../../component/buttons/PrimaryButton";
import LogoDiscord from "../../assets/icons/commucation/logo-discord.svg"



import {Colors} from "../../constant/Colors";
// import { getPrivacyPolicy } from "../../BackEnd/controllers/setting";
// import { alertProvider } from "../../BackEnd/errorHandler";
import TerciaryButton from "../../component/buttons/TerciaryButton";



export default function AppInfo({navigation, route}) {
  const appInfo = route.params?.appInfo;

  async function onPressPolicy() {
    navigation.navigate('Privacy Policy');
  }

  function onWebsitePress(){
    Linking.openURL(appInfo.webSite);
  }

  function onInstaPress() {
    Linking.openURL("https://instagram.com/hopteo_cpge?igshid=MjEwN2IyYWYwYw==");
  }

  function onDiscordPress() {
    Linking.openURL("https://discord.gg/GQ6ereZGVW");
  }

  return (
    <ScrollView style={styles.mainContainer}>
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
            <Text style={styles.titleText}>A propos d'Hopteo</Text> 
            <Text style={styles.infoText}>{appInfo?.description}</Text>
            
            <View style={{ alignSelf: "center", marginBottom: "15%"}} >
              <TerciaryButton
                title = "Politique de Confidentialité"
                onPress={onPressPolicy}
                color={Colors.orange500}
                isFullColor={true}
                fontSize={15}
              />
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-evenly", }}>

              <View style={{alignItems: "center", width: "33%"}}>
                <PrimaryButton name="logo-instagram" onPress={onInstaPress} size={30}/>
                <TouchableOpacity onPress={onInstaPress} >
                  <Text style={styles.linkText}>@hopteo_cpge</Text>
                </TouchableOpacity>
              </View>

              <View style={{alignItems: "center", width: "33%"}}>
                <PrimaryButton name="logo-dribbble" onPress={onWebsitePress} size={30}/>
                <TouchableOpacity onPress={onWebsitePress} >
                  <Text style={styles.linkText}>hopteo.com</Text>
                </TouchableOpacity>
              </View>

              <View style={{alignItems: "center", width: "33%"}}>
                <TouchableOpacity style={{paddingTop: 3}} onPress={onDiscordPress}>
                  <LogoDiscord width={30} height={30} fill={Colors.fullBlack}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDiscordPress} >
                  <Text style={styles.linkText}>Discord</Text>
                </TouchableOpacity>
              </View>

            </View>
    
            
          </View>

        ) : <Text style={[styles.infoText]}>{"Erreur de chargement..."}</Text>

        }
        

    </ScrollView>
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
    paddingHorizontal: "5%",
  },
  titleText: {
    fontSize: 22, 
    fontWeight: "600", 
    alignSelf: "center",
    // marginBottom: 20, 
    // textAlign: "center"
  },
  linkText: {
    fontSize: 14, 
    fontWeight: "600",
  },

  infoText: {
    fontSize: 15, 
    textAlign: "justify", 
    marginTop: 20,
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