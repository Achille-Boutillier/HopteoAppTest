import { Alert } from "react-native";

export function alertProvider(message, title="Une erreur s'est produite...") {
  

  Alert.alert(
    title,
    message ? message : "Mince alors ! Retentes ta chance dans quelques instants",
    [
      { text: "fermer", style: "cancel"},
      // {text: "Se Reconnecter", style: "delete", onPress: loginScreenNavigation}
    ]
  );
}
