import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../../constant/Colors";
// import { SwipeListView } from "react-native-swipe-list-view";
// import { Swipeable } from "react-native-gesture-handler";

const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;
const parcoursSize = {width: 0.3*width, height:38};   // faciliter la gestion des container swipables
const figureSize = {width:0.6*width , height:50};



function DotComponent({list, currentNumber}) {

  let dotContent;
  if (list.length>1) {
    dotContent = list.map((item, index) => 
      <Text key={item} style={currentNumber==index ? styles.ActivatedDot : styles.dot}> { "\u2022"  } </Text>
    )
  } else {
    dotContent=null
  }

return (
  <View style={styles.dotContainer}>
    {dotContent}
          
  </View>
)
};

export default function SCEIComponent({parcoursChoix, rangMedian, nombrePlace, filiereList}) {
  
  const parcoursChoixKeys = Object.keys(parcoursChoix);

  const [parcoursSlide, setParcoursSlide ] = useState(0);
  const [currentParcours, setCurrentParcours] = useState(parcoursChoixKeys[parcoursSlide]);  // == parcoursChoix[0]
  const [figureSlide, setFigureSlide ] = useState(0);


  useEffect(()=> {
    setCurrentParcours(parcoursChoixKeys[parcoursSlide]);    // == parcoursChoixKeys[1] == "parcours1"  (ou 2 ou 3...)
  }, [parcoursSlide])
  
  

  function onScrollParcours(nativeEvent) {
    if (nativeEvent) {
    const newSlide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width -0.5); // -0.5 pour effectuer le chgmt au milieu du slide
      if (newSlide != parcoursSlide) {
        setParcoursSlide(newSlide);
      }
    }
  }

  function onScrollFigure(nativeEvent) {
    if (nativeEvent) {
    const newSlide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width -0.5);
      if (newSlide != figureSlide) {
        setFigureSlide(newSlide);
      }
    }
  }


  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainTitle}>Inscription SCEI</Text>

      <View style={parcoursSize}>
        <ScrollView 
          onScroll={({nativeEvent}) => onScrollParcours(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled   // scroll de page en page au lieu de continuellement
          horizontal
          style={parcoursSize}
        >
          {
            parcoursChoixKeys.map((item, index) => 
              <View key={item} style={styles.parcoursContainer}>
                <Text style={styles.subTitle}>{parcoursChoix[item]}</Text>
              </View>
              // <Text  style={{width: 50, height: 50, borderWidth: 1}}>{item}</Text>
            )
          }
        </ScrollView>
      </View>

      <DotComponent list={parcoursChoixKeys} currentNumber={parcoursSlide} />



      <View style={figureSize}>
      
        <ScrollView 
          onScroll={({nativeEvent}) => onScrollFigure(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled   // scroll de page en page au lieu de continuellement
          horizontal
          style={figureSize}
        >
          {
            filiereList.map((item, index) => 
              <View key={item} style={styles.figureContainer}>

                <View style={styles.leftContainer}>
                  <View style={styles.fieldContainer}>
                    <Text style={styles.figureText}>{item}</Text>
                  </View>
                </View>

                <View style={styles.middleContainer}>
                  <Text style={styles.subTitle}>Rang médian</Text>
                  <Text style={styles.subTitle}>Places</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.figureText}>{rangMedian[currentParcours][item]}</Text>
                  <Text style={styles.figureText}>{nombrePlace[currentParcours][item]}</Text>
                </View>
      
              </View>
            )
          }
        </ScrollView>
      </View>


      <DotComponent list={filiereList} currentNumber={figureSlide} />
 
    </View>
  );

};

const styles = StyleSheet.create({

  dotContainer: {
    flexDirection: 'row', 
    alignSelf: "center",
    // borderWidth: 1,
    alignItems: "center",
    // position: 'absolute',

    height: 35,
    // margin: -20,
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

  // ------------------------------------


  mainContainer: {
    width : 0.7*width,
    height: 180,
    // height: "20%",
    backgroundColor: Colors.blue400,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    marginTop: 15,
  },

  mainTitle: {
    color: Colors.grey, 
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 4,
  },

  

  subTitle: {
    color: Colors.grey ,
    fontWeight: "500",
    fontSize: 14,
    textTransform: 'capitalize',
    // textAlign: "center",
    verticalAlign: "center",
    // alignSelf: "center",
  },

  parcoursContainer: {
    backgroundColor: Colors.white,
    // paddingHorizontal: 20,
    // paddingVertical: 5, 
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
    color: Colors.smoothBlack ,
    fontWeight: "700",
    fontSize: 14,
    // textAlign: "center",
    verticalAlign: "center",
  },




});
