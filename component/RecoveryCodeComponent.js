import { View, Text } from "react-native";
import TerciaryButton from "./buttons/TerciaryButton";
import InputComponent from "./InputComponent";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../constant/Colors";
import { useNavigation } from "@react-navigation/native";
import { recoverAccount, sendRecoveryCode, verifyRecoveryCode } from "../BackEnd/controllers/userData";


export default function RecoveryCodeComponent({setIsEditing, isCharging, setIsCharging}) {

  const navigation = useNavigation();
  
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [innerComponentType, setInnerComponentType] = useState("emailInput");
  const [recoveryData, setRecoveryData] = useState({});
  const [dataToRemember, setDataToRemember] = useState({});
  const uselessFunction = ()=> {};

 
  useEffect(()=> {
      let textInfo;
      let buttonTitle;
      let inputNumber;
      let inputTitle1;
      let inputTitle2;
      let inputType;
    if (innerComponentType ==="emailInput") {
      textInfo = "Récupérer mon compte Hopteo";
      buttonTitle = "M'envoyer un code" ;
      inputNumber = 1;

      inputTitle1 = "Email";
      inputTitle2 = "" ;
      inputType ="email" ;
    } else if (innerComponentType === "codeInput") {
      textInfo = "Un code à usage unique a été envoyé à l'adresse mail indiquée. Renseigne-le ci-dessous pour continuer." ;
      buttonTitle = "Vérifier le code" ;
      inputNumber = 1 ;

      inputTitle1 = "Code" ;
      inputTitle2 = "" ;
      inputType = "numeric" ;
    } else if (innerComponentType === "newPasswordInput") {
      textInfo = "Le code précédent a été vérifié avec succès." ;
      buttonTitle = "Changer le mot de passe" ;
      inputNumber = 2 ;

      inputTitle1 = "Nouveau mot de passe" ;
      inputTitle2 = "Confirmer mot de passe" ;
      inputType = "password" ;
    } else if (innerComponentType === "modifSuccess") {
      textInfo = "Le mot de passe a été modifié avec succès." ;
      buttonTitle = "Retourner à la page de connexion" ;
      inputNumber = 0 ;

      inputTitle1 = null;
      inputTitle2 = null;
      inputType = null ;
    } 
    setRecoveryData({textInfo, buttonTitle, inputNumber, inputTitle1, inputTitle2, inputType})
    setFirstInput("");
    setSecondInput("");
  }, [innerComponentType])

  function areAllAnswered() {
    if (recoveryData.inputNumber === 0) {
      return true;
    } else if (recoveryData.inputNumber === 1) {
      return firstInput ? true : false ;
    } else if (recoveryData.inputNumber === 2) {
      return (firstInput && secondInput) ? true : false ;
    } 
  }

  function onSubmit() {
    // console.log(firstInput, secondInput);
    const answered = areAllAnswered();
    if (answered) {
      setErrorMessage();
      setIsCharging(true);
    } else {
      setErrorMessage("Certains champs ne sont pas remplis");
    }
  }


  useEffect(()=>{
    if (isCharging) {
      switch (innerComponentType) {
        case "emailInput" : 
          sendCodeByMail();
        break;
        case "codeInput" : 
          verifyCode();
        break;
        case "newPasswordInput" : 
          // setInnerComponentType("modifSuccess")
          modifyPassword();
        break;
        case "modifSuccess" : 
          navigation.reset({
            index: 0,
            routes: [{ name: "Login Screen" }],
          });
        break;
      }
    }
  }, [isCharging])


  async function sendCodeByMail() {
    const data = await sendRecoveryCode(firstInput);
    if (data.success) {
      setInnerComponentType("codeInput");
      setDataToRemember((state)=>({...state, email: firstInput}));
    } else {
      data.message ? setErrorMessage(data.message) : setErrorMessage("Une erreur s'est produite");
    }
    setIsCharging(false);
  }

// todo: s'assurer que les fonction suivantes fonctionnent : -----------------------------------------------

  async function verifyCode() {
    // console.log(dataToRemember.email);
    // console.log(firstInput);
    const data = await verifyRecoveryCode(dataToRemember.email, firstInput);
    if (data.success) {
      setInnerComponentType("newPasswordInput");
      setDataToRemember((state)=>({...state, recoveryToken: data.recoveryToken }));
    } else {
      data.message ? setErrorMessage(data.message) : setErrorMessage("La vérification a échoué");
    }
    setIsCharging(false);
  }

  async function modifyPassword() {
    // console.log(dataToRemember.recoveryToken);
    // console.log(firstInput);
    // console.log(secondInput);
    if (firstInput===secondInput) {
      const data = await recoverAccount(dataToRemember.recoveryToken, firstInput);
      if (data.success) {
        setInnerComponentType("modifSuccess");
        setDataToRemember({});
      } else {
        data.message ? setErrorMessage(data.message) : setErrorMessage("La modification a échoué");
      }
    } else {
      setErrorMessage("Les 2 mots de passe ne sont pas identiques")
    }
    setIsCharging(false);
  
  }
// todo -------------------------------------------------------------------------------------




  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.textInfo}>{recoveryData.textInfo}</Text>

        <Text style={styles.errorMessage} >{errorMessage}</Text>
      </View>
      <View style={[
        styles.formContainer, 
        recoveryData.inputNumber ? {height: 95*recoveryData.inputNumber, justifyContent: recoveryData.inputNumber===2 ? "space-between" : "center" } : null
      ]}>

        {recoveryData.inputNumber===1
          ? <InputComponent title={recoveryData.inputTitle1} inputType={recoveryData.inputType} input={firstInput} setInput={setFirstInput} setIsEditing={setIsEditing} onSubmitEditing={recoveryData.inputNumber === 1 ? onSubmit : uselessFunction }/>
          : null
        }
        { recoveryData.inputNumber===2 
          ? ((
            <>
              <InputComponent title={recoveryData.inputTitle1} inputType={recoveryData.inputType} input={firstInput} setInput={setFirstInput} setIsEditing={setIsEditing} onSubmitEditing={recoveryData.inputNumber === 1 ? onSubmit : uselessFunction }/>
              <InputComponent title={recoveryData.inputTitle2} inputType={recoveryData.inputType} input={secondInput} setInput={setSecondInput} onSubmitEditing={onSubmit} setIsEditing={setIsEditing}/>
            </>
          )): null
        }
      </View>
      <TerciaryButton title={recoveryData.buttonTitle} onPress={onSubmit} color={Colors.orange500} isFullColor={true}/>
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
    alignItems: "center",
    width: "90%",
  },
  
  textInfo: {
    fontSize: 17,
    fontWeight: "500",
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
