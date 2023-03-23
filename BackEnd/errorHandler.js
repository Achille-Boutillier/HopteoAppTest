
import { Alert } from "react-native";

export function alertProvider(loginScreenNavigation, leftFunction) {

  let onLeftButtonPress;
  let leftButtonName;
  if (!!leftFunction) {
    leftButtonName = "Réessayer";
    onLeftButtonPress = leftFunction;
  } else {
    leftButtonName = "Fermer";
    onLeftButtonPress = null ;   // function sans action
  }

  Alert.alert(
    "Une erreur s'est produite...",
    "Mince alors ! Retentes ta chance dans quelques instants ou reconnectes-toi",
    [{ text: leftButtonName, style: "cancel", onPress: onLeftButtonPress},
      {text: "Se Reconnecter", style: "delete", onPress: loginScreenNavigation}
    ]
  ); 
  }