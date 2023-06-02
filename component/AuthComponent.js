
import { useEffect, useState } from "react";
import {FlatList, StyleSheet, View, ActivityIndicator, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Colors } from "../constant/Colors";
import InputComponent from "./InputComponent";
import { BrandComponent } from "./TopBar";
import TerciaryButton from "./buttons/TerciaryButton";
import QuaternaryButton from "./buttons/QuaternaryButton";
import { useNavigation } from "@react-navigation/native";
import ActivityComponent from "./ActivityComponent";


export default function AuthComponent({typeScreen ,onSubmit, onChangeTypeScreen, errorMessage, ischarging }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstButtonTitle, setFirstButtonTitle] = useState("");
  const [secondButtonTitle, setSecondButtonTitle] = useState("");
  const [headerReadius, setHeaderRadius ] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isForgetVisible, setIsForgetVisible] = useState(false);

  const [pageTitle, setPageTitle ] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");

  const navigation = useNavigation();

  useEffect(()=> {
    console.log("[isEditing]", isEditing);
  }, [isEditing])

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
      setIsForgetVisible(true);
    }
  }, [typeScreen])


  function onPressForgetCode() {
    navigation.navigate("RecoveryCode");
  }

  return (
    <View style={[styles.mainContainer, ischarging ? {opacity: 0.3} : null]}>
      <View 
        style={ [styles.contentContainer, isEditing ? (
            Platform.OS === "ios" ? styles.contentContainerIosOnEditing : null
          ) : null ] 
        } 
      >
      
      
        <Text style={styles.pageTitle}>{pageTitle}</Text>
    

        {/* {!isEditing 
          ? (
            <View style={styles.headerContainer}>
              <Text style={styles.pageTitle}>{pageTitle}</Text>
            </View>
          ) : null
        } */}


        {/* <View style={[
            styles.bodyContainer, 
            isEditing ? styles.bodyOnEditing : {...styles.bodyNotEditing, ...headerReadius},
            // {opacity: ischarging ? 0.6 : 1}
          ]}
        > */}

        {!isEditing 
          ? (
          <Text style={styles.catchPhrase}>{catchPhrase}</Text>
          ) : null
        }

        {/* {errorMessage 
          ? (
            <Text style={styles.errorMessage} >{errorMessage}</Text>
          ) : null
        } */}

        {/* {<Text style={styles.errorMessage} >{errorMessage}</Text>} */}

        {/* <KeyboardAvoidingView
          style={{width: "100%", alignItems: "center", zIndex: 2, backgroundColor: Colors.white}}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        > */}
        <Text style={styles.errorMessage} >{errorMessage}</Text>

        <View 
          style={[styles.formContainer, {height: isForgetVisible ? 200 : 190}]}
        >
          <InputComponent title="Email" inputType="email" input={email} setInput={setEmail} setIsEditing={setIsEditing} />
          <View style={{width: "100%"}} > 
            <InputComponent 
              title="Mot de passe" 
              inputType="password" 
              input={password} 
              setInput={setPassword} 
              onSubmitEditing={()=> onSubmit(email, password)} 
              setIsEditing={setIsEditing}
              
            />

            {isForgetVisible 
              ? <View style={styles.forgetContainer}>
                  <QuaternaryButton 
                    title="Mot de passe oublié ?" 
                    onPress={onPressForgetCode} 
                    textColor={Colors.orange500}
                    fontSize={12}
                  /> 
                </View>
              : null
            }
          </View>

        </View>
        {/* </KeyboardAvoidingView> */}
        <TerciaryButton title={firstButtonTitle} onPress={()=> onSubmit(email, password)} color={Colors.orange500} isFullColor={true}/>


          
        {!isEditing ? <TerciaryButton title={secondButtonTitle} onPress={onChangeTypeScreen} color={Colors.orange500} /> : null}
        {!isEditing ? <BrandComponent marginLeft={0} logoSize={60} fontSize={30}/> : null}
        
        
        

     
      {/* {ischarging ? <ActivityComponent/> : null} */}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    // justifyContent: "space-around",
    // alignItems: "center",
  },

  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "space-around",
    alignItems: "center",
  },

  contentContainerIosOnEditing: {
    flex: 0,
    height: "60%",
  },

  headerContainer: {
    // height: "13%",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  pageTitle: {
    // verticalAlign: "center",
    textAlign: "center",
    color: Colors.orange500,
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

  // bodyContainer: {
  //   backgroundColor: Colors.white,
  //   width: "100%",
  //   alignItems: "center",
  //   // borderTopLeftRadius: 80,
  //   justifyContent: "space-evenly",
  //   // borderWidth: 1
  // },

  // bodyOnEditing: {
  //   position: "relative",
  //   flex: 1,
  //   // height: "99%",
  //   // marginTop: 10,
  //   // bottom: null,
  //   // justifyContent: "center",
  // }, 
  // bodyNotEditing: {
  //   position: "absolute",
  //   height: "87%",
  //   bottom: 0,
  //   // paddingTop: 50,
  //   // justifyContent: "center",

  // },

  

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
    justifyContent: "space-between",
    // borderWidth: 1,
  },
  
  forgetContainer: {
    marginLeft: 10,
    alignSelf: "flex-start",
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
