import {View, StyleSheet, Text, TouchableOpacity, TextInput, Linking, ScrollView, Dimensions} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import PrimaryButton from "../../component/PrimaryButton";
import { Colors } from "../../constant/Colors";
// import { reset } from "../../BackEnd/controllers/userData";
import {deleteUser, disconnect, getUserInfo, getAppContact, getAppInfo, resetSwipe } from "../../BackEnd/controllers/setting";
import { alertProvider } from "../../BackEnd/errorHandler.js";
// import SecondaryButton from "../../component/SecondaryButton";

import ConfirmPasswordModal from "../../component/ConfirmPasswordModal";
import { useDispatch } from "react-redux";
import { reinitialiseSchoolReducer } from "../../core/reducers/schoolReducer";
import { reinitialiseForRankingReducer } from "../../core/reducers/forRankingReducer";
import { reinitialiseSwipeReducer } from "../../core/reducers/swipeReducer";
import { reinitialiseUserSettingReducer } from "../../core/reducers/userSettingReducer";


const deviceHeight = Dimensions.get("window").height;

function SettingsSection({ onPress, iconName, optionTitle }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.sectionContainer}>
      <Ionicons name={iconName} size={30} color={Colors.orange500} />
      <Text style={{ marginLeft: "6%", fontSize: 16 }}>{optionTitle}</Text>
    </TouchableOpacity>
  );
}

export default function Settings({ navigation }) {
const dispatch = useDispatch();

  const [appMail, setAppMail] = useState(null);
  const [isContactUsModalVisible, setIsContactUsModalVisible] = useState(false);

  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  // const [password, setPassword] = useState();
  const [modalErrorMessage, setModalErrorMessage] = useState();
  const [modalButtonName, setModalButtonName] = useState();
  const [modalBodyText, setModalBodyText] = useState();
  const [userInfo, setUserInfo] = useState();
  const [appInfo, setAppInfo] = useState();
  // const [isAppInfoPressed, setIsAppInfoPressed] = useState();

  async function getUserData() {
    console.log("je passe dans getData");
    const data = await getUserInfo();
    const mail = await getAppContact(); // todo : à obtenir seulement après click
    setUserInfo(data);
    setAppMail(mail?.email); // todo : ...après click
  }

  useEffect(() => {
    getUserData();
  }, []);

  function loginScreenNavigation() {
    navigation.navigate("Login Screen");
  }

  // ** Signaler un Beug ---------------------------


  function handleFeedbackModal() {
    return Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSfecyioNQwyYGtMLdIVB4_ovEm_tRbAd0Tpyqixnlh0MpRkzQ/viewform?usp=sf_link");
  }

  // ** Fin Beug ---------------------

  // ** ---------- Contact Us --------------------

  async function getHopteoContact() {
    console.log("je passe dans getHopteoData");
    const mail = await getAppContact(); // todo : store rédux
    // setUserInfo(data);
    if (mail?.email) {
      setAppMail(mail.email); 
    } else {
      alertProvider();
    }
  }

  useEffect(() => {
    (isContactUsModalVisible && !appMail) ? getHopteoContact() : null ;
  }, [isContactUsModalVisible]);

  function handleContactUsmodal() {
    setIsContactUsModalVisible((bool) => !bool);
  }

  // ** ---------- fin Contact Us --------------------

  // ** ------------ App info ----------------------------------
  function onPressAppInfo() {
    if (!!appInfo) {
      appInfoNavigation();
    } else {
      handleAppInfo();
      // console.log("[appInfo]", appInfo);
    }
  }

  function appInfoNavigation() {
    navigation.navigate("App Info", { appInfo: appInfo });
  }

  async function handleAppInfo() {
    const data = await getAppInfo();
    console.log(data);
    if (!!data && !data.error) {
      setAppInfo(data);
      return;
    } else {
      appInfoNavigation();
      return;
    }  
  }

  useEffect(() => {
    if (appInfo) {
      appInfoNavigation();
    }
  }, [appInfo])

  // ** ------------- Fin App Info ---------------------------


  // ** ------------- politiques confidentialités ---------------------------

  async function onPressPolicy() {
    navigation.navigate('Privacy Policy');
  }



  // ** ------------- fin politiques confidentialités ---------------------------



  function onPressModifyPassword() {
    navigation.navigate("Modify Password");
  }

  // ** ---------- reset ------------------------
  async function reinitialise(password) {
    const resetSuccess = await resetSwipe(password, dispatch);
    if (resetSuccess) {
      navigation.navigate("Home", {jumpToFirstCard: true});
    } else {
      alertProvider();
    }
  }

  function onPressReset() {
    setModalBodyText(
      "Tu ne pourras plus revenir en arrière une fois ton compte réinitialisé ! Ton classement sera perdu..."
    );
    setModalButtonName("Réinitialiser");
    handlePasswordModal();
  }
  // ** ---------- fin reset ------------------------

  // **-------------------- delete ---------------------------------
  async function deleteAccount(password) {
    const data = await deleteUser(password);
    console.log(data);
    if (data?.message === "Compte supprimé avec succès !") {
      handlePasswordModal(); //supprimer la modal
      navigation.navigate("Login Screen");
    } else if (data?.message) {
      setModalErrorMessage(data.message);
      // setPassword();
    } else {
      setModalErrorMessage("Une erreur est survenue");
      // setPassword();
    }
  }

  function onPressDeleteAccount() {
    setModalBodyText(
      "Tu ne pourras plus revenir en arrière un fois ton compte supprimé..."
    );
    setModalButtonName("Supprimer mon Compte");
    handlePasswordModal();
  }
  // ** ----------- fin Delete ------------------

  // ** -------- password Modal ----------------------------
  function handlePasswordModal() {
    setIsPasswordModalVisible((bool) => !bool);
    // setPassword();
    setModalErrorMessage();
  }

  function onSubmitPasswordModal(password) {
    if (!!password) {  // si le user a renseigné son password
      if (modalButtonName === "Réinitialiser") {
        reinitialise(password);
      } else if (modalButtonName === "Supprimer mon Compte") {
        deleteAccount(password);
      }
    } else {
      setModalErrorMessage("Le champs 'Mot de passe' doit être rempli");
    }
  }

  // **---------- fin password Modal ---------------------

  // -----------------------------------------------------------------------------------------------------

  function onPressDisconnect() {
    disconnect();
    navigation.navigate("Login Screen"); 
    dispatch(reinitialiseSchoolReducer());
    dispatch(reinitialiseForRankingReducer());
    dispatch(reinitialiseSwipeReducer());
    dispatch(reinitialiseUserSettingReducer());
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <PrimaryButton
          onPress={() => navigation.navigate("Home")}
          name="arrow-back"
          size={30}
          color={Colors.orange500}
        />
        <Text style={styles.title}>Paramètres</Text>
      </View>
      <ScrollView contentContainerStyle={styles.bodyContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.UserInfoContainer}>
          <Text style={styles.userInfoTitle}>Ton profil :</Text>
          <Text style={styles.userInfoText}>Email : {userInfo?.email}</Text>
          <Text style={styles.userInfoText}>Filière : {userInfo?.filiere}</Text>
        </View>

        <SettingsSection
          iconName={"bug-outline"}
          optionTitle={"Signaler un Bug"}
          onPress={handleFeedbackModal}
        />
        <SettingsSection
          iconName={"chatbubble-outline"}
          optionTitle={"Nous contacter"}
          onPress={handleContactUsmodal}
        />
        <SettingsSection
          iconName={"information-circle-outline"}
          optionTitle={"A propos de l'application"}
          onPress={onPressAppInfo}
        />
        <SettingsSection
          iconName={"newspaper-outline"}
          optionTitle={"Politique de confidentialité"}
          onPress={onPressPolicy}
        />
        <SettingsSection
          iconName={"lock-closed-outline"}
          optionTitle={"Modifier mon mot de passe"}
          onPress={onPressModifyPassword}
        />
        <SettingsSection
          iconName={"refresh"}
          optionTitle={"Reset tous mes swipes"}
          onPress={onPressReset}
        />
        <SettingsSection
          iconName={"trash-bin-outline"}
          optionTitle={"Supprimer mon compte"}
          onPress={onPressDeleteAccount}
        />
        <SettingsSection
          iconName={"log-out-outline"}
          optionTitle={"Se déconnecter"}
          onPress={onPressDisconnect}
        />
        {/* <SettingsSection iconName={"help-circle-outline"} optionTitle={"Aide"} /> */}
      </ScrollView>

      <ConfirmPasswordModal
        isVisible={isPasswordModalVisible}
        handlePasswordModal={handlePasswordModal}
        modalBodyText={modalBodyText}
        modalErrorMessage={modalErrorMessage}
        modalButtonName={modalButtonName}
        submitButtonName={modalButtonName}
        onSubmitPassword={onSubmitPasswordModal}
      />
      {/* <Modal isVisible={isPasswordModalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}> Attention !</Text>
            <PrimaryButton
              onPress={handlePasswordModal}
              name="close-outline"
              size={40}
              color={Colors.orange500}
            />
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.modalBodyText}>{modalBodyText}</Text>
            <Text style={styles.errorMessageText}>{modalErrorMessage}</Text>
            <View style={styles.modalPasswordContainer}>
              <TextInput
                style={styles.passwordInput}
                autoCapitalize="none" //empêcher l'autocapitalisation ou autocorrection du phone
                autoCorrect={false}
                onChangeText={(enteredText) => setPassword(enteredText)}
                secureTextEntry
                value={password}
                placeholder="Mot de passe"
              />
              <SecondaryButton
                onPress={passwordModalFunction}
                buttonText={modalButtonName}
                fontSize={15}
                preSized={false}
              />
            </View>
          </View>
        </View>
      </Modal> */}

      <Modal isVisible={isContactUsModalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}> Nous contacter </Text>
            <PrimaryButton
              onPress={handleContactUsmodal}
              name="close-outline"
              size={40}
              color={Colors.orange500}
            />
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.modalBodyText}>
              Pour tout problème ou recommandation, contacte l'adresse e-mail
              suivante :
            </Text>
            <TouchableOpacity
              onPress={appMail ? () => Linking.openURL(`mailto:${appMail}`) : () => {}}
            >
              <Text style={appMail ? {color: Colors.orange500, textDecorationLine: "underline", fontSize: 18,} : null} >
                {appMail ? appMail : "Erreur de chargement..."}
              </Text>
            </TouchableOpacity>
            {/* <Text selectable={true} style={styles.modalBodyText}>{appMail}</Text> */}
          </View>
        </View>
      </Modal>

      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // marginTop: 10,
    // padding: "10%",
    backgroundColor: Colors.backgroundColor,
    // alignItems: "center",
    // width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    height: "10%",
    paddingLeft: "4%",
  },
  title: {
    // position: "absolute",
    // alignSelf: "center",
    fontWeight: "bold",
    marginLeft: "5%",
  },

  bodyContainer: {
    // flex: 1,
    // paddingTop: deviceHeight*0.04,
    paddingHorizontal: "5%",
    alignItems: "center",
    // borderWidth: 1,
  },

  UserInfoContainer: {
    borderRadius: 15,
    // height: "15%",
    width: "100%",
    padding: 20,
    marginVertical: deviceHeight*0.04,
    // marginBottom: 20,
    backgroundColor: Colors.grey300,
    // justifyContent: "space-evenly",
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  userInfoText: {
    fontSize: 16,
    marginLeft: 30,
  },

  sectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: deviceHeight*0.02,
    // height: "9%",
    width: "100%",
    borderRadius: 5,
    paddingLeft: "8%",
    paddingVertical: 15,
    backgroundColor: Colors.white,
  },

  // modal --------------------------------------------------------
  modal: {
    height: 350,
    width: "100%",
    backgroundColor: Colors.white,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
  },
  modalHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  modalHeaderText: {
    fontSize: 20,
    textAlign: "center",
    marginLeft: 10,
    fontWeight: "500",
  },
  modalBody: {
    justifyContent: "space-evenly",
    // borderWidth: 1,
    alignItems: "center",
    flex: 1,
    width: "90%",
  },
  modalBodyText: {
    fontSize: 18,
    textAlign: "left",
    // selectable: true,
    // marginVertical: 30,
  },
  modalPasswordContainer: {
    height: "55%",
    width: "100%",
    backgroundColor: Colors.grey,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  passwordInput: {
    // borderWidth: 1,
    backgroundColor: Colors.white,
    // paddingVertical: 3,
    paddingHorizontal: 10,
    width: "70%",
    height: "30%",
    borderRadius: 3,
    marginBottom: 5,
  },
  errorMessageText: {
    color: Colors.orange500,
  },
});
