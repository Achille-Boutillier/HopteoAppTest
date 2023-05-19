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
      title: '',
      subtitle: "",
    },
    {
      backgroundColor: '#fff',
      image: <OnBoardImageComponent screenType={"swipe"} />,
      subtitle: "Indique tes critères de sélection en swipant vers l'une des 4 directions possibles.",
      title: '',
    },
    {
      backgroundColor: '#fff',
      image: <OnBoardImageComponent screenType={"rank"} />,
      subtitle: "Consulte ton classement d'écoles d'ingénieur personalisé",
      title: '',
    },
    {
      backgroundColor: '#fff',
      image: <OnBoardImageComponent screenType={"school"} />,
      subtitle: "Compare les spécificités propres à chaque écoles : la formation, le coût, la localisation, etc ...",
      title: '',
    },
    {
      backgroundColor: '#fff',
      image: <OnBoardImageComponent screenType={"explore"} stroke={true}/>,
      subtitle: "L'onglet explore te permet de découvrir librement les écoles de ton choix.",
      title: '',
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
      onDone={() => resetNavigationScreen('First Questions Screen')}
      onSkip={() => resetNavigationScreen('First Questions Screen')}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      containerStyles={styles.container}
      imageContainerStyles={styles.imageContainer}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      bottomBarHeight={60}
      bottomBarColor={Colors.grey300}
      showSkip={false}
      showDone={true}
      showPagination = {true}
      

    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // borderWidth: 1,
    heigth: "60%",
    justifyContent: "flex-start"
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    // marginVertical: 10,
    // borderWidth: 1,
    // alignSelf: "center",
  },
  
  title: {
    // borderWidth: 1,
    fontSize: 5,
    marginTop: -10,
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

