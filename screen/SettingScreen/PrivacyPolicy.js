import {useWindowDimensions, ScrollView, StyleSheet, View, Text, ActivityIndicator, } from "react-native";

// import WebView from "react-native-webview";          // NOT WORKING
import RenderHTML from "react-native-render-html";

import PrimaryButton from "../../component/PrimaryButton";
import {Colors} from "../../constant/Colors";
import { useEffect, useState } from "react";
import { getPrivacyPolicy } from "../../BackEnd/controllers/setting";



export default function PrivacyPolicy({navigation, route}) {
  // const policyHtml = route.params.policyHtml
  const [policyHtml, setPolicyHtml] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const {width} = useWindowDimensions();    // indispensable à renderHTML

  async function handlePolicyData() {
    const html = await getPrivacyPolicy();
    console.log("requete d'obtention html")
    console.log("[html]", html);
    if (html && !html?.error) {
      setPolicyHtml(html) ;
    } else {
      setErrorMessage("Echec du chargement...")
      alertProvider();
    } 
  }
  

  useEffect(()=> {
    handlePolicyData();
  }, [])


  if (policyHtml) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer} >
          <PrimaryButton 
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={28}
            color={Colors.orange500}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          <RenderHTML
            contentWidth={width/2}
            source={{html: policyHtml }}
          />
        </ScrollView>
  
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>{errorMessage}</Text>
      </View>
    )
  } else {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color={Colors.orange500} />
      </View>
    )
  }
}
  




const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  headerContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 40,
    paddingLeft: "6%",
    marginTop: "1%",
  },
  scrollView: {
    alignSelf: "center",
    flex: 1,
    width: "90%",
  },
 
});