
import { useEffect, useState } from "react";
import {FlatList, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { Colors } from "../constant/Colors";
import InputComponent from "./InputContainer";
import { BrandComponent } from "./TopBar";
import TerciaryButton from "./TerciaryButton";


export default function AuthComponent({typeScreen ,onSubmit, onChangeTypeScreen, errorMessage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstButtonTitle, setFirstButtonTitle] = useState("");
  const [secondButtonTitle, setSecondButtonTitle] = useState("");
  const [headerReadius, setHeaderRadius ] = useState({});

  const [pageTitle, setPageTitle ] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");


  useEffect(()=> {
    if (typeScreen==="signup") {
      setPageTitle("Inscription");
      setCatchPhrase("Crée ton compte gratuitement pour continuer sur Hopteo !");
      setFirstButtonTitle("Je m'inscris");
      setSecondButtonTitle("J'ai déjà un compte");
      setHeaderRadius({borderTopLeftRadius: 80});
    } else if (typeScreen === "login") {
      setPageTitle("Connexion");
      setCatchPhrase("Connecte-toi à ton compte Hopteo");
      setFirstButtonTitle("Connexion");
      setSecondButtonTitle("Créer un compte");
      setHeaderRadius({borderTopRightRadius: 80});
    }
  }, [typeScreen])


  return (
    <View style={styles.mainContainer}>
     
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>{pageTitle}</Text>
      </View>


      <View style={[styles.bodyContainer, headerReadius]}>

        <Text style={styles.catchPhrase}>{catchPhrase}</Text>

        <Text style={styles.errorMessage} >{errorMessage}</Text>

        <View style={styles.formContainer}>
          <InputComponent title="Email" input={email} setInput={setEmail} />
          <InputComponent title="Mot de passe" input={password} setInput={setPassword} onSubmitEditing={()=> onSubmit(email, password)}/>
        </View>

          
        <TerciaryButton title={firstButtonTitle} onPress={()=> onSubmit(email, password)} color={Colors.orange500} isFullColor={true}/>
        <TerciaryButton title={secondButtonTitle} onPress={onChangeTypeScreen} color={Colors.orange500} />
        
        <BrandComponent marginLeft={0} logoSize={60} fontSize={30}/>

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.orange500,
    justifyContent: "flex-start",
    // marginTop: "10%",
  },
  headerContainer: {
    height: "13%",
    alignSelf: "center",
    justifyContent: "center",
    // borderWidth: 1,

  },
  pageTitle: {
    // verticalAlign: "center",
    textAlign: "center",
    color: Colors.white,
    fontSize: 30,
    fontWeight: "700",

  },

  bodyContainer: {
    backgroundColor: Colors.white,
    position: "absolute",
    bottom: 0,
    height: "87%",
    width: "100%",
    alignItems: "center",
    // borderTopLeftRadius: 80,
  },

  catchPhrase: { 
    fontSize: 18, 
    fontWeight: "500",
    textAlign: "center",
    marginTop: 50,
    marginHorizontal: "10%",
  },

  errorMessage: {
    textAlign: "center", 
    color: Colors.orange500, 
    marginBottom: "3%", 
    marginTop: "3%", 
    width: "75%",
  },
  formContainer: {
    height: 170,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  

  button: {
    width: "60%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange100,
    marginTop: "3%",
    borderRadius: 10,
  },
});
