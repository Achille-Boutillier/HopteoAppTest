
import {View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { BrandComponent } from '../TopBar';
import { useEffect, useState } from 'react';
import { Colors } from '../../constant/Colors';
const height = Dimensions.get("window").height;


export default function OnBoardImageComponent({screenType}) {

  const [path, setPath] = useState(require("../../assets/images/onBoardImages/swipeScreenshot.jpg"));  // need to be initialy set to prevent bug in render


  useEffect(()=> {
    let path=null;
    switch (screenType) {
      // case "intro" :
      //   path = require("../../assets/images/onBoardImages/swipeScreenshot.jpg");
      //   break;
      case "swipe" :
        path = require("../../assets/images/onBoardImages/swipeScreenshot.jpg");
        
        break;
      case "rank" :
        path = require("../../assets/images/onBoardImages/classementScreenshot.jpg");
        
        break;
      case "school" :
        path = require("../../assets/images/onBoardImages/schoolPageScreenshot.jpg");
       
        break;
      case "explore" :
        path = require("../../assets/images/onBoardImages/exploreScreenshot.jpg");
        
        break;
    }
    setPath(path);
  }, [])


  if(screenType==="intro") {
    return (
      <View style={styles.introContainer}>
        <Text style = {styles.introHeaderText}>Bienvenue sur</Text>
        <BrandComponent logoSize={60} fontSize={30} marginLeft='-0.5%'/>
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <BrandComponent logoSize={50} fontSize={25} marginLeft='-0.5%'/>
        <Image source={path} style={styles.image} />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems:"center",
    // flex: 1,
    // borderWidth: 1,
  }, 

  image: {
    // flex: 1,
    width: height*0.55*720/1180,
    height: height*0.55,
    borderRadius: 10,
    marginTop: 10,
    // justifyContent: "flex-start",
    // resizeMode: 'cover',
    // top: 50,
    // overflow: 'hidden'
    // borderWidth: 1,
  },
  introContainer: {
    height: height/3,
    width: "90%",
    justifyContent: "flex-end",
    alignItems: "center",
    // borderWidth: 1,
  }, 
  introHeaderText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.orange500,
  }
  
});

