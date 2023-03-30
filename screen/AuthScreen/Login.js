import { useEffect } from "react";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Image,
} from "react-native";
import { login } from "../../BackEnd/controllers/userData";

import { Colors } from "../../constant/Colors";
import Logo from "../../assets/icons/logo.svg";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginButtonPressed, setLoginButtonPressed] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState();

  function onLoginPress() {
    setLoginButtonPressed(true);
  }

  function resetState() {
    setLoginErrorMessage();
    setEmail("");
    setPassword("");
  }

  function onNewAccountPress() {
    resetState();
    navigation.navigate("Sign Up Screen");
  }

  async function tryLogin() {
    setLoginButtonPressed(false); // reset l'etat du bouton au cas où l'authentification echoue
    const loginAnswer = await login(email, password);
    if (loginAnswer?.success) {
      let nextScreen;
      if (loginAnswer?.userSettingStatus) {
        nextScreen = "Main Screens";
      } else {
        nextScreen = "First Questions Screen";
      }
      navigation.navigate(nextScreen);
      resetState();
    } else {
      if (loginAnswer?.message) {
        // console.log("je passe dans else if");
        setLoginErrorMessage(loginAnswer?.message);
      } else {
        setLoginErrorMessage("Echec de la tentative de connexion");
      }
    }
  }

  useEffect(() => {
    if (loginButtonPressed) {
      tryLogin();
    }
  }, [loginButtonPressed]);

  return (
    <View style={styles.mainContainer}>
      <Logo width={101} height={101} />

      <Image />
      <Text style={{ fontSize: 18, fontWeight: "500" }}>
        Connecte toi à ton compte Hopteo !
      </Text>

      <Text
        style={{
          textAlign: "center",
          color: Colors.orange500,
          marginBottom: "3%",
          marginTop: "3%",
          width: "75%",
        }}
      >
        {loginErrorMessage}
      </Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputContainer}
          placeholder="email"
          onChangeText={(text) => setEmail(text.trim())} // .trim() to remove whitespace at the end and begining
          value={email}
          type="email"
          autoCapitalize="none"
          // cursorColor={Colors.orange500}      // for Android only
          selectionColor={Colors.orange500}
          autoComplete="email"
          keyboardType="email-address"
          // inputMode="email"
          // caretHidden={true}
        />
        <TextInput
          style={styles.inputContainer}
          placeholder="Mot de passe"
          onChangeText={(text) => setPassword(text.trim())}
          onSubmitEditing={onLoginPress}
          value={password}
          secureTextEntry
          autoCapitalize="none"
          selectionColor={Colors.orange500}
        />
        <TouchableOpacity style={styles.button} onPress={onLoginPress}>
          <Text>Connexion</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: "10%" }}
          onPress={onNewAccountPress}
        >
          <Text style={{ textAlign: "center" }}>
            {"Nouveau.elle sur Hopteo ?\nCréer mon compte"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    //  marginBottom: "10%",
  },
  formContainer: {
    //  height: "40%",
    height: 250,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blue400,
    borderRadius: 20,
  },
  inputContainer: {
    height: "18%",
    width: "80%",
    //  borderWidth: 1,
    marginBottom: "3%",
    borderRadius: 10,
    paddingLeft: 15,
    backgroundColor: Colors.white,
  },
  button: {
    //  width: "60%",
    //  height: "13%",
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.orange100,
    marginTop: "3%",
    borderRadius: 10,
  },
});
