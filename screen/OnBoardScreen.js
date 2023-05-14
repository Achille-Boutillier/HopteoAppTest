import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import TerciaryButton from '../component/buttons/TerciaryButton';
import { Colors } from '../constant/Colors';

const height = Dimensions.get("window").height;


export default function OnBoardScreen({ navigation }) {
  const [boardingIndex, setBoardingIndex] = useState(0);
  const nextButtonTitle = "suivant";

  const pages = [
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/images/argent.jpg')} style={{height: 100, width: 100}} />,
      title: 'Bienvenue sur Hopteo !',
      subtitle: "Découvre comment créer ton classement d'école d'ingénieur personalisé sur Hopteo.",
    },
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/images/onBoardImages/swipeScreenshot.jpeg')} style={styles.image} />,
      title: 'Swipe des cartes',
      subtitle: "Indique tes critères de sélection en swipant vers l'une des 4 directions possibles.",
    },
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/images/onBoardImages/classementScreenshot.jpeg')} style={styles.image} />,
      // image: <Image source={require('./assets/feature.png')} style={styles.image} />,
      title: "Découvre ton classement Personalisé",
      subtitle: "Consulte ton classement d'écoles d'ingénieur personalisé",
    },
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/images/onBoardImages/schoolPageScreenshot.jpeg')} style={styles.image} />,
      // image: <Image source={require('./assets/feature.png')} style={styles.image} />,
      title: "Consulte la page des écoles qui t'intéressent",
      subtitle: "Compare les spécificités propres à chaque écoles : la formation, le coût, la localisation, etc ...",
    },
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/images/onBoardImages/exploreScreenshot.jpeg')} style={styles.image} />,
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
      NextButtonComponent={(props) => (
          <TerciaryButton
            title={nextButtonTitle}
            onPress={props.onPress}
            color={Colors.orange500}
            isFullColor={true}
            fontSize={16}
            style={{marginRight: 20}}
            secondColor={Colors.grey300}
            // transparent={true}
          />
      )}
      DoneButtonComponent={(props) => (
        <TerciaryButton
          title="C'est parti !"
          onPress={props.onPress}
          color={Colors.orange500}
          isFullColor={true}
          fontSize={16}
          style={{marginRight: 20}}
          secondColor={Colors.grey300}
          // transparent={true}
        />
    )}
      // SkipButtonComponent={(props) => ( boardingIndex===0 
      //   ? ((
      //   <TerciaryButton
      //     title={"Ignorer"}
      //     onPress={props.onPress}
      //     color={Colors.orange500}
      //     isFullColor={false}
      //     fontSize={16}
      //     style={{marginLeft: 20,}}
      //     secondColor='transparent'
      //     // transparent={true}
      //   />
      //   )) : null
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
    // top: 0,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    // marginVertical: 10,
  },
  image: {
    // flex: 1,
    width: height*0.60*717/1210,
    height: height*0.60,
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
    marginTop: height*0.02

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

