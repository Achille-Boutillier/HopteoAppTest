import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constant/Colors";
import { getUserSettingStatus } from "../../BackEnd/controllers/userData";
// import { SwipeListView } from "react-native-swipe-list-view";
// import { Swipeable } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
// const height = Dimensions.get('window').height;
const parcoursSize = { width: 0.5 * width, height: 38 }; // faciliter la gestion des container swipables
const figureSize = { width: 0.70 * width, height: 50 };

function DotComponent({ list, currentNumber }) {
  const [dotContent, setDotContent] = useState(null); ;

  useEffect(()=> {
    let newDotContent = null;
    if (list.length > 1) {
      newDotContent = list.map((item, index) => (
        // <View key={item} style={{}} >
          <Text key={item} style={currentNumber == index ? styles.ActivatedDot : styles.dot}>
            {"\u2022"}{" "}
          </Text>
          // <Text style={styles.dot}>{" "}</Text>
        // </View>
      ));
    } else {
      newDotContent= <View style={styles.emptyDotContent} ></View>
    }

    setDotContent(newDotContent);
  }, [currentNumber])


  return <View style={styles.dotContainer}>{dotContent}</View>;
}





export default function SCEIComponent({ parcoursChoix, admission }) {
  //todo: implementer un currentField
  const parcoursChoixKeys = Object.keys(parcoursChoix);


  const [parcoursSlide, setParcoursSlide] = useState(0);
  const [currentParcours, setCurrentParcours] = useState(parcoursChoixKeys[parcoursSlide]); // == parcoursChoixKeys[0]
  const [figureSlide, setFigureSlide] = useState(0);

  // console.log(Object.keys(admission));
  const sortedFiliereList = getSortedList();


  function getSortedList() {
    let filiereList = Object.keys(admission).filter(
      (key) => Object.keys(admission[key]).length !== 0
    );
    console.log(1, filiereList); //
    const userFiliere = getUserSettingStatus().filiere;
    console.log(userFiliere);
    const isUserFieliereIncluded = filiereList.includes(userFiliere)
    isUserFieliereIncluded ? filiereList = filiereList.filter((item)=> item !== userFiliere) : null;
    console.log(2, filiereList); //
    alphabeticOrderedList = filiereList.sort((a, b)=> a.localeCompare(b));
    console.log(3, alphabeticOrderedList); //
    const sortedList = isUserFieliereIncluded ? [userFiliere, ...alphabeticOrderedList] : alphabeticOrderedList ;
    console.log(4, sortedList); //
    return sortedList;
  }


  useEffect(() => {
    setCurrentParcours(parcoursChoixKeys[parcoursSlide]); // == parcoursChoixKeys[1] == "parcours1"  (ou 2 ou 3...)
  }, [parcoursSlide]);

  function onScrollParcours(nativeEvent) {
    if (nativeEvent) {
      const newSlide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width - 0.5
      ); // -0.5 pour effectuer le chgmt au milieu du slide
      if (newSlide != parcoursSlide) {
        setParcoursSlide(newSlide);
      }
    }
  }

  function onScrollFigure(nativeEvent) {
    if (nativeEvent) {
      const newSlide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width - 0.5
      );
      if (newSlide != figureSlide) {
        setFigureSlide(newSlide);
      }
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainTitle}>Inscription SCEI</Text>

      <View style={styles.swipeableContainer}>
        <View style={[parcoursSize, {zIndex: 1}]}>
          <ScrollView
            onScroll={({ nativeEvent }) => onScrollParcours(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled // scroll de page en page au lieu de continuellement
            horizontal
            style={parcoursSize}
          >
            {parcoursChoixKeys.map(
              (item) => (
                <View key={item} style={styles.parcoursContainer}>
                  <Text style={styles.subTitle} adjustsFontSizeToFit={true}>
                    {parcoursChoix[item]}
                  </Text>
                </View>
              )
              // <Text  style={{width: 50, height: 50, borderWidth: 1}}>{item}</Text>
            )}
          </ScrollView>
        </View>

        <DotComponent list={parcoursChoixKeys} currentNumber={parcoursSlide} />
      </View>
      
      <View style={styles.swipeableContainer}>
        <View style={[figureSize, {zIndex: 1}]}>
          <ScrollView
            onScroll={({ nativeEvent }) => onScrollFigure(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled // scroll de page en page au lieu de continuellement
            horizontal
            style={figureSize}
          >
            {sortedFiliereList.map((item, index) => (
              <View key={item} style={styles.figureContainer}>
                <View style={styles.leftContainer}>
                  <View style={styles.fieldContainer}>
                    <Text
                      style={styles.figureText}
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}
                    >
                      {item}
                    </Text>
                  </View>
                </View>
              
                <View style={styles.middleContainer}>
                  <Text style={styles.subTitle}>Rang médian</Text>
                  <Text style={styles.subTitle}>Places</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.figureText}>
                    {admission[item][currentParcours]
                      ? admission[item][currentParcours].rangMedian
                      : "-"}
                  </Text>
                  <Text style={styles.figureText}>
                    {admission[item][currentParcours]
                      ? admission[item][currentParcours].nombrePlace
                      : "-"}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <DotComponent list={sortedFiliereList} currentNumber={figureSlide} />
      </View>

      <View style={styles.currentConcoursContainer}>

        <View style={styles.iconContainer}>
          <Ionicons name={"newspaper-sharp"} size={25} color={Colors.grey} />
        </View>
        <View style={{flex: 1}}  numberOfLines={2}>
          <Text style={[styles.subTitle, {}]}>
            {admission[sortedFiliereList[figureSlide]][currentParcours]?.concours 
            ? admission[sortedFiliereList[figureSlide]][currentParcours].concours
            : "-"}  {/* par exemple admission["MP"]["parcours1"].concours */}
          </Text>                  
        </View>
        {/* <View style={{width: "10%", borderWidth: 1}}></View> */}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    alignSelf: "center",
    // borderWidth: 1,
    alignItems: "center",
    zIndex: 0,
    marginTop: -7,
    // padding: 0,
    // position: 'absolute',
    // height: 35,
  },

  ActivatedDot: {
    color: Colors.orange500,
    fontSize: 25,
    // textAlign: "center",
    // verticalAlign: "center",
  },
  dot: {
    color: Colors.orange100,
    fontSize: 20,
    // textAlign: "center",
    // verticalAlign: "center",
  },
  emptyDotContent: {
    height: 30,
  },


  // ------------------------------------

  mainContainer: {
    width: 0.9 * width,
    // height: 180,
    // height: "20%",
    backgroundColor: Colors.grey300,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    marginTop: 25,
    paddingTop: 10,
    paddingBottom: 15,
  },

  mainTitle: {
    color: Colors.grey,
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 15,
    // marginTop: 4,
  },

  subTitle: {
    color: Colors.grey,
    fontWeight: "500",
    fontSize: 14,
    textTransform: "capitalize",
    textAlign: "center",
    verticalAlign: "middle",
    // borderWidth: 1,
  },

  swipeableContainer: {
    alignItems: "center",
    // borderWidth: 1,
    // height: 56,
    // padding: 1,
  },

  parcoursContainer: {
    backgroundColor: Colors.white,
    // paddingHorizontal: 20,
    // paddingVertical: 5,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: parcoursSize.width,
    height: parcoursSize.height,
  },
  figureContainer: {
    width: figureSize.width,
    height: figureSize.height,
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
  },

  leftContainer: {
    // borderWidth: 1,
    width: "27%",
    // height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 5,
  },
  middleContainer: {
    // borderWidth: 1,
    width: "46%",
    // height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  rightContainer: {
    // borderWidth: 1,
    width: "27%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  fieldContainer: {
    backgroundColor: Colors.blue400,
    borderRadius: 10,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  figureText: {
    color: Colors.smoothBlack,
    fontWeight: "700",
    fontSize: 14,
    // textAlign: "center",
    verticalAlign: "middle",
  },
  currentConcoursContainer: {
    backgroundColor: Colors.white,
    paddingRight: 15,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    width:figureSize.width
    // width: parcoursSize.width,
    // height: parcoursSize.height,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "27%",
    // marginRight: 20,
    // paddingHorizontal: 13,
    // borderWidth:1,
  },
});
