// import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../constant/Colors";

function MessageContainer({children}) {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.contentContainer} >
          <Text style={styles.textStyle}>{children}</Text>
        </View>
      </View>
    );
}

export default MessageContainer;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "center",
    // width: "70%",
    // height: "20%",
    // marginTop: "30%",
   
  },
  contentContainer: {
    backgroundColor: Colors.blue400,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20, 
  },
  textStyle : { 
    fontWeight: "600", 
    fontSize: 16, 
    color: Colors.grey,
    textAlign: 'center',
}
});