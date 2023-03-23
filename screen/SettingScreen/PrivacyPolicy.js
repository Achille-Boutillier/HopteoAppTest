import {useWindowDimensions, ScrollView, StyleSheet, View, Text, } from "react-native";

// import WebView from "react-native-webview";          // NOT WORKING
import RenderHTML from "react-native-render-html";

import PrimaryButton from "../../component/PrimaryButton";
import {Colors} from "../../constant/Colors";



export default function PrivacyPolicy({navigation, route}) {
  const policyHtml = route.params.policyHtml
  const {width} = useWindowDimensions();    // indispensable à renderHTML

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