
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
  const [isEditing, setIsEditing] = useState(false);

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
     
      {!isEditing 
        ? (
          <View style={styles.headerContainer}>
            <Text style={styles.pageTitle}>{pageTitle}</Text>
          </View>
        ) : null
      }


      <View style={[styles.bodyContainer, headerReadius, isEditing ? styles.bodyOnEditing : styles.bodyNotEditing]}>

        <Text style={styles.catchPhrase}>{catchPhrase}</Text>

        <Text style={styles.errorMessage} >{errorMessage}</Text>

        <View style={styles.formContainer}>
          <InputComponent title="Email" input={email} setInput={setEmail} setIsEditing={setIsEditing}/>
          <InputComponent title="Mot de passe" input={password} setInput={setPassword} onSubmitEditing={()=> onSubmit(email, password)} setIsEditing={setIsEditing}/>
        </View>

          
        <TerciaryButton title={firstButtonTitle} onPress={()=> onSubmit(email, password)} color={Colors.orange500} isFullColor={true}/>
        {!isEditing ? <TerciaryButton title={secondButtonTitle} onPress={onChangeTypeScreen} color={Colors.orange500} /> : null}
        
        {!isEditing ? <BrandComponent marginLeft={0} logoSize={60} fontSize={30}/> : null}

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

  catchPhrase: { 
    fontSize: 20, 
    fontWeight: "500",
    textAlign: "center",
    // marginTop: 50,
    marginHorizontal: "10%",
  },

  bodyContainer: {
    backgroundColor: Colors.white,
    width: "100%",
    alignItems: "center",
    // borderTopLeftRadius: 80,
    justifyContent: "center",
    // borderWidth: 1

  },

  bodyOnEditing: {
    position: "relative",
    height: "100%",
    paddingTop: 0,
    // bottom: null,
    // justifyContent: "center",
  }, 
  bodyNotEditing: {
    position: "absolute",
    height: "87%",
    bottom: 0,
    paddingTop: 50,
    // justifyContent: "center",

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
