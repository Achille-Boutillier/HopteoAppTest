
import { StyleSheet, View, Text,} from "react-native";
import { Colors } from "../../constant/Colors";

export default function ProfessionalOpportunities({secteurDebouche}) {

  // ! si secteurDebouche n'existe pas, il ne faut pas utiliser object.keys()
  const secteur = Object.keys(secteurDebouche ? secteurDebouche : {});   //--> ["chimie", "energies", ...]


  return (
    <View style={styles.mainContainer}> 
      <View style={styles.textContainer}>
        {secteur.map((item, key) => (
          <Text key={key} style={styles.textStyle} > {`${item} : ${secteurDebouche[item]}%`}</Text>
        ))}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.grey300,
    // borderWidth: 1.5,
    // borderColor: Colors.blue400,
    width: "70%",
    borderRadius: 10,
    // paddingLeft: 20,
    // paddingHorizontal: "3%",
    marginBottom: 10,
    paddingVertical: 10,
  },
  textContainer: {
    alignItems: "flex-start",
    // borderWidth: 1,
  },

  textStyle: {
    textAlign: "center", 
    color: Colors.grey, 
    fontWeight: "600",
    margin: 2,
  },
  

});
