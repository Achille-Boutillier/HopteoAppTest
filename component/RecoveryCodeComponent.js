import { View, Text } from "react-native";
import TerciaryButton from "./TerciaryButton";
import InputComponent from "./InputComponent";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../constant/Colors";
import { useNavigation } from "@react-navigation/native";


export default function RecoveryCodeComponent({setIsEditing}) {

  const navigation = useNavigation();
  
  // const [email, setEmail] = useState("");
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [inputTitle1, setInputTitle1] = useState("");
  const [inputTitle2, setInputTitle2] = useState("");
  // const [inputData, setInputData] = useState();
  const [innerComponentType, setInnerComponentType] = useState("emailInput");
  const [inputNumber, setInputNumber] = useState(1);
  const [inputType, setInputType] = useState("");

  
  // const [isEditing, setIsEditing] = useState(false);

  const [textInfo, setTextInfo] = useState("");


  // useEffect(()=> {
  //   console.log("[isEditing]", isEditing);
  // }, [isEditing])

  useEffect(()=> {
    if (innerComponentType ==="emailInput") {
      setTextInfo("Récupérer mon compte Hopteo.");
      setButtonTitle("M'envoyer un code");
      setInputNumber(1);

      setInputTitle1("Email");
      setInputTitle2("");
      setInputType("email");
    } else if (innerComponentType === "codeInput") {
      setTextInfo("Un email contenant un code de vérification à usage unique a été envoyé à l'adresse que tu nous as indiqué.");
      setButtonTitle("Vérifier le code");
      setInputNumber(1);

      setInputTitle1("Code");
      setInputTitle2("");
      setInputType("numeric");
    } else if (innerComponentType === "newPasswordInput") {
      setTextInfo("Le code précédent a été vérifié avec succès.");
      setButtonTitle("Changer le mot de passe");
      setInputNumber(2);

      setInputTitle1("Nouveau mot de passe");
      setInputTitle2("Confirmer mot de passe");
      setInputType("password");
    } else if (innerComponentType === "modifSuccess") {
      setTextInfo("Le mot de passe a été modifié avec succès.");
      setButtonTitle("Retourner à la page de connexion");
      setInputNumber(0);

      setInputTitle1();
      setInputTitle2();
      setInputType(null);
    } 
  }, [innerComponentType])


  function onSubmit() {
    console.log(firstInput, secondInput);
    switch (innerComponentType) {
      case "emailInput" : 
        setInnerComponentType("codeInput")
      break;
      case "codeInput" : 
        setInnerComponentType("newPasswordInput")
      break;
      case "newPasswordInput" : 
        setInnerComponentType("modifSuccess")
      break;
      case "modifSuccess" : 
        navigation.reset({
          index: 0,
          routes: [{ name: "Login Screen" }],
        });
      break;
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.textInfo}>{textInfo}</Text>

        <Text style={styles.errorMessage} >{errorMessage}</Text>
      </View>
      <View style={[styles.formContainer, {height: 95*inputNumber, justifyContent: inputNumber===2 ? "space-between" : "center" }]}>

        {inputNumber!==0 
          ? <InputComponent title={inputTitle1} inputType={inputType} input={firstInput} setInput={setFirstInput} setIsEditing={setIsEditing}/>
          : null
        }
        { inputNumber===2 
          ? <InputComponent title={inputTitle2} inputType={inputType} input={secondInput} setInput={setSecondInput} onSubmitEditing={()=> onSubmit(firstInput, secondInput)} setIsEditing={setIsEditing}/>
          : null
        }
      </View>
      <TerciaryButton title={buttonTitle} onPress={()=> onSubmit(firstInput, secondInput)} color={Colors.orange500} isFullColor={true}/>
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth:1, 
    width: "100%",
  },
  textContainer: {
    width: "90%",
  },
  
  textInfo: {
    textAlign: "center",
  },

  errorMessage: {
    textAlign: "center", 
    color: Colors.orange500, 
    marginBottom: "3%", 
    marginTop: "3%", 
    width: "75%",
  },
  formContainer: {
    // height: 190,
    width: "80%",
    alignItems: "center",
    // justifyContent: "space-between",
    // borderWidth: 1,
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
