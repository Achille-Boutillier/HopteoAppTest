import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import { Colors } from '../constant/Colors';
import OnBoardButton from '../component/onBoard/OnBoardButton';
import OnBoardImageComponent from '../component/onBoard/OnBoardImageComponent';

const height = Dimensions.get("window").height;


export default function OnBoardScreen({ navigation }) {
  const [boardingIndex, setBoardingIndex] = useState(0);
  

  const pages = [
    {
      backgroundColor: '#fff',
      image: <OnBoardImageComponent screenType={"intro"} />,
      // image: <Image source={require('../assets/images/argent.jpg')} style={{height: 100, width: 100}} />,
      title: '',
      subtitle: "Découvre comment créer ton classement d'école d'ingénieur personalisé sur Hopteo.",
    },
    {
      backgroundColor: '#fff',
      // image: <Image source={require('../assets/images/onBoardImages/swipeScreenshot.jpg')} style={styles.image} />,
      image: <OnBoardImageComponent screenType={"swipe"} />,
      title: 'Swipe des cartes',
      subtitle: "Indique tes critères de sélection en swipant vers l'une des 4 directions possibles.",
    },
    {
      backgroundColor: '#fff',
      image: <OnBoardImageComponent screenType={"rank"} />,
      // image: <Image source={require('./assets/feature.png')} style={styles.image} />,
      title: "Découvre ton classement Personalisé",
      subtitle: "Consulte ton classement d'écoles d'ingénieur personalisé",
    },
    {
      backgroundColor: '#fff',
      image: <OnBoardImageComponent screenType={"school"} />,
      // image: <Image source={require('./assets/feature.png')} style={styles.image} />,
      title: "Consulte la page des écoles qui t'intéressent",
      subtitle: "Compare les spécificités propres à chaque écoles : la formation, le coût, la localisation, etc ...",
    },
    {
      backgroundColor: '#fff',
      image: <OnBoardImageComponent screenType={"explore"} />,
      // image: <Image source={require('./assets/feature.png')} style={styles.image} />,
      title: 'Explore librement les écoles de ton choix',
      subtitle: "L'onglet explore te permet de découvrir librement les écoles de ton choix.",
    },
  ];

  function resetNavigationScreen(screen) {
    navigation.reset({
      index: 0,
      routes: [{ name: screen }],
    });
  }

  return (
    <Onboarding
      pages={pages}
      onPageChange={(index)=> setBoardingIndex(index)}
      NextButtonComponent={({onPress}) => (<OnBoardButton buttonType="next" onPress={onPress}/>)}
      DoneButtonComponent={({onPress}) => (<OnBoardButton buttonType="done" onPress={onPress}/>)}
      // SkipButtonComponent={({onPress}) => ( boardingIndex===0 
      //   ? <OnBoardButton buttonType="skip" onPress={onPress}/>
      //   : null
      // )}
      // NextButtonComponent={<TerciaryButton title={nextButtonTitle} onPress={()=> {}}  color={Colors.orange500} isFullColor={true} fontSize={14}/>}
      onDone={() => resetNavigationScreen('Signup Screen')}
      onSkip={() => resetNavigationScreen('Signup Screen')}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      containerStyles={styles.container}
      imageContainerStyles={styles.imageContainer}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      bottomBarHeight={80}
      bottomBarColor={Colors.grey300}
      showSkip={false}
      showDone={true}
      showPagination = {true}
      

    />
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderWidth: 1,
    justifyContent: "flex-start"
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    // marginVertical: 10,
  },
  image: {
    // flex: 1,
    width: height*0.50*720/1180,
    height: height*0.50,
    borderRadius: 10,
    // justifyContent: "flex-start",
    // resizeMode: 'cover',
    // top: 50,
    // overflow: 'hidden'
    // borderWidth: 1,

    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    // marginTop: height*0.02

  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  dot: {
    backgroundColor: '#c4c4c4',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
});

