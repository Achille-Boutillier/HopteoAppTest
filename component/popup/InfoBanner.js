

import { View, StyleSheet, Text,  } from "react-native";
import { Colors } from "../../constant/Colors";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleShowRankingPopup } from "../../core/reducers/forRankingReducer";
import PrimaryButton from "../buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import store from "../../core";


export default function InfoBanner({message, dontShow}) {  

  const dispatch = useDispatch();
  // const [timer, setTimer] = useState(0);
  const [isDelayReached, setIsDelayReached] = useState(false);
  const navigation = useNavigation();
  const forRankingReducer = useSelector((state) => state.forRankingReducer);



  useEffect(() => {
    // Arrête le timer après 5 secondes
    const timeout = setTimeout(() => {
      // clearInterval(interval);
      setIsDelayReached(true); // Met à jour le timer à la valeur finale (5 secondes)
    }, 5000);

    // return clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      const showRankingPopup = store.getState().forRankingReducer.showRankingPopup;
      console.log("[je passe dans le useeffect ========== showrankingpopup]", showRankingPopup);

      // exécuté à la navigation vers autre vue
      showRankingPopup ? dispatch(toggleShowRankingPopup()) : null ;    //! à chaque blur il y a un toggle (devrait arriver si showRankingPopup true, pas si false)
      // forRankingReducer.showRankingPopup ? dispatch(toggleShowRankingPopup()) : null ;    //! à chaque blur il y a un toggle (devrait arriver si showRankingPopup true, pas si false)
    });

    // Nettoyage de l'écouteur d'événement lorsque le composant est démonté pour éviter les fuites de mémoire
    return unsubscribe;
  }, [navigation]);



  if (dontShow || !isDelayReached ) {
    return null ;
  } else {
    return (
      <View style={styles.main}>
        <View style={styles.body}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
  
        <View style={styles.crossContainer}>
          {/* <Text style={styles.headerText}> Attention !</Text> */}
          <PrimaryButton
            onPress={()=>dispatch(toggleShowRankingPopup())}
            name="close-outline"
            size={20}
            color={Colors.orange500}
          />
        </View>
  
      </View>
    );
  }
  
}


const styles = StyleSheet.create({
  main: {
    marginTop: "3%",
    width: "90%",
    // backgroundColor: Colors.white,
    backgroundColor: Colors.orange100,
    // backgroundColor: Colors.grey300,
    alignSelf: "center",
    flexDirection:"row",
    borderRadius: 3,
  },

  
  body: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "3%",
    paddingLeft: "2%",
    width: "94%",
  },

  messageText: {
    textAlign: "justify",
    fontSize: 15,
  },

  crossContainer: {
    position: "absolute",
    right: 0,
    top: 0,
  },

 
});
