
import {View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { BrandComponent } from '../TopBar';
import { useEffect, useState } from 'react';
import { Colors } from '../../constant/Colors';
const height = Dimensions.get("window").height;


export default function OnBoardImageComponent({screenType, stroke=false}) {

  const [path, setPath] = useState(require("../../assets/images/onBoardImages/swipeScreenshot.jpg"));  // need to be initialy set to prevent bug in render
  const [title, setTitle] = useState(null);

  useEffect(()=> {
    let newPath=null;
    let newTitle = null;
    switch (screenType) {
      case "intro" :
        // newPath = require("../../assets/images/onBoardImages/swipeScreenshot.jpg");
        newTitle= "Découvre comment créer ton classement personnalisé d'écoles d'ingénieurs  sur Hopteo.";
        break;
      case "swipe" :
        newPath = require("../../assets/images/onBoardImages/swipeScreenshot.jpg");
        newTitle= 'Swipe des cartes';
        
        break;
      case "rank" :
        newPath = require("../../assets/images/onBoardImages/classementScreenshot.jpg");
        newTitle= "Découvre ton classement personnalisé";
        
        break;
      case "school" :
        newPath = require("../../assets/images/onBoardImages/schoolPageScreenshot.jpg");
        newTitle= "Consulte la page des écoles qui t'intéressent";

        break;
      case "explore" :
        newPath = require("../../assets/images/onBoardImages/exploreScreenshot.jpg");
        newTitle= 'Explore librement les écoles de ton choix';
        
        break;
    }
    setPath(newPath);
    setTitle(newTitle);
  }, [])


  if(screenType==="intro") {
    return (
      <View style={styles.introContainer}>
        <Text style = {styles.introHeaderText}>Bienvenue sur</Text>
        <BrandComponent logoSize={60} fontSize={30} marginLeft='-0.5%'/>
        <Text style={[styles.title, styles.introTitle]}>{title}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <BrandComponent logoSize={50} fontSize={25} marginLeft='-0.5%'/>
        <Text style={styles.title}>{title}</Text>
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
  introTitle: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
    paddingHorizontal: "5%",
    // width: "90%",
    // marginTop: height*0.02

  },

  image: {
    // flex: 1,
    width: height*0.48*720/1180,
    height: height*0.48,
    borderRadius: 10,
    marginTop: 10,
    // justifyContent: "flex-start",
    // resizeMode: 'cover',
    // top: 50,
    // overflow: 'hidden'
    // borderWidth: 1,
  },
  introContainer: {
    height: height,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  }, 
  introHeaderText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.orange500,
    // marginTop: 50,
  }
  
});

