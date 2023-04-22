import { Alert } from "react-native";

export function alertProvider(message) {
  

  Alert.alert(
    "Une erreur s'est produite...",
    message ? message : "Mince alors ! Retentes ta chance dans quelques instants",
    [
      { text: "fermer", style: "cancel"},
      // {text: "Se Reconnecter", style: "delete", onPress: loginScreenNavigation}
    ]
  );
}
