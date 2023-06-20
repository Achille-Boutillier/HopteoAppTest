import { StyleSheet, View, Text} from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../../../constant/Colors";



export default function DotComponent({ list, currentNumber }) {
  const [dotContent, setDotContent] = useState(null); ;

  useEffect(()=> {
    let newDotContent = null;
    if (list.length > 1) {
      newDotContent = list.map((item, index) => (
        <Text key={item} style={currentNumber == index ? styles.ActivatedDot : styles.dot}>
          {"\u2022"}{" "}
        </Text>
      ));
    } else {
      newDotContent= <View style={styles.emptyDotContent} ></View>
    }

    setDotContent(newDotContent);
  }, [currentNumber])


  return <View style={styles.dotContainer}>{dotContent}</View>;
}


const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    alignSelf: "center",
    // borderWidth: 1,
    alignItems: "center",
    zIndex: 0,
    marginTop: -7,
  },

  ActivatedDot: {
    color: Colors.orange500,
    fontSize: 25,
  },

  dot: {
    color: Colors.orange100,
    fontSize: 20,
  },

  emptyDotContent: {
    height: 30,
  },
});
