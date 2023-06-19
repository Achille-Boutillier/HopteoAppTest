import {View, StyleSheet, Text, TouchableOpacity, TextInput, Linking, ScrollView, Dimensions} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import PrimaryButton from "../../component/buttons/PrimaryButton";
import { Colors } from "../../constant/Colors";
import {deleteUser, disconnect, getUserInfo, getAppContact, getAppInfo, resetSwipe } from "../../BackEnd/controllers/setting";
import { alertProvider } from "../../BackEnd/errorHandler.js";

import ConfirmPasswordModal from "../../component/popup/ConfirmPasswordModal";
import { useDispatch } from "react-redux";
// import { reinitialiseSchoolReducer } from "../../core/reducers/schoolReducer";
// import { reinitialiseForRankingReducer } from "../../core/reducers/forRankingReducer";
import { reinitialiseSwipeReducer, setSwipeStateHasChanged } from "../../core/reducers/swipeReducer";
import { reinitialiseUserSettingReducer } from "../../core/reducers/userSettingReducer";
import {updateBackData } from "../../BackEnd/updateBackData";


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
  const [isPasswordModalCharging, setIsPasswordModalCharging] = useState(false);
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

  // function loginScreenNavigation() {
  //   navigation.navigate("Login Screen");
  // }

  // ** Signaler un Beug ---------------------------


  function onPressBugReport() {
    return Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSfecyioNQwyYGtMLdIVB4_ovEm_tRbAd0Tpyqixnlh0MpRkzQ/viewform?usp=sf_link");
  }

  function onPressIdee() {
    return Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSfMJ3f158RFLro2jpeGJTDrdWZieQEw3HF1TTPgv9zxTGbJlA/viewform");
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

  // ** ---------- reset swipe------------------------
  async function reinitialiseSwipe(password) {
    const resetSuccess = await resetSwipe(password, dispatch);
    if (resetSuccess) {
      togglePasswordModal();
      setSwipeStateHasChanged(true);
      navigation.navigate("Home", {jumpToFirstCard: true});
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Home" }],
      // });
    } else {
      setModalErrorMessage("la réinitialisation a échouée");
      // alertProvider();
    }
    setIsPasswordModalCharging(false);
  }

  function onPressReset() {
    setModalBodyText(
      "Tu ne pourras plus revenir en arrière une fois tes swipes réinitialisés ! Ton classement sera perdu..."
    );
    setModalButtonName("Réinitialiser");
    togglePasswordModal();
  }
  // ** ---------- fin reset swipe------------------------

  // **-------------------- delete ---------------------------------
  async function deleteAccount(password) {
    updateBackData(dispatch);   // maj les info anvant de supprimer
    const data = await deleteUser(password);
    // console.log(data);
    if (data?.success) {
      togglePasswordModal();
      disconnect("Signup Screen", navigation, dispatch ); 
      
    } else if (data.errorMessage) {
      setModalErrorMessage(data.errorMessage);
    } else {
      setModalErrorMessage("Une erreur est survenue, la suppression du compte n'a pas aboutie");
    }
    setIsPasswordModalCharging(false);
  }

  function onPressDeleteAccount() {
    setModalBodyText(
      "Tu ne pourras plus revenir en arrière un fois ton compte supprimé..."
    );
    setModalButtonName("Supprimer mon Compte");
    togglePasswordModal();
  }
  // ** ----------- fin Delete ------------------

  // ** -------- password Modal ----------------------------
  function togglePasswordModal() {
    setIsPasswordModalVisible((bool) => !bool);
    // setPassword();
    setModalErrorMessage();
  }

  function onSubmitPasswordModal(password) {
    (()=>setIsPasswordModalCharging(true))();     //instantanément exécuté
    if (!!password) {  // si le user a renseigné son password
      if (modalButtonName === "Réinitialiser") {
        reinitialiseSwipe(password);
      } else if (modalButtonName === "Supprimer mon Compte") {
        deleteAccount(password);
      }
    } else {
      setModalErrorMessage("Le champs 'Mot de passe' doit être rempli");
      setIsPasswordModalCharging(false);
    }
  }

  // **---------- fin password Modal ---------------------

  // -----------------------------------------------------------------------------------------------------

  function onPressDisconnect() {
    updateBackData(dispatch);   // maj les info anvant de deconnecter
    disconnect("Login Screen", navigation, dispatch);
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
          onPress={onPressBugReport}
        />
        <SettingsSection
          iconName={"chatbubble-outline"}
          optionTitle={"Nous contacter"}
          onPress={handleContactUsmodal}
        />
        <SettingsSection
          iconName={"bulb-outline"}
          optionTitle={"Une idée d'amélioration ?"}
          onPress={onPressIdee}
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
        togglePasswordModal={togglePasswordModal}
        modalBodyText={modalBodyText}
        modalErrorMessage={modalErrorMessage}
        modalButtonName={modalButtonName}
        submitButtonName={modalButtonName}
        onSubmitPassword={onSubmitPasswordModal}
        isPasswordModalCharging={isPasswordModalCharging}
      />
      

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
