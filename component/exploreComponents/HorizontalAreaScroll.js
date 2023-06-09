
import { View, StyleSheet, Text } from "react-native";
import HorizontalScroll from "../HorizontalScroll";
import ExploreSchoolBanner from "./ExploreSchoolBanner";
import { Colors } from "../../constant/Colors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";


export default function HorizontalAreaScroll({areaIdList, scrollWidth, scrollHeight, emptyAreaMessage}) {

  const schoolsData = useSelector((state) => state.schoolReducer.schoolsData);
  const [sortedAreaList, setSortedAreaList] = useState(areaIdList);

  useEffect(() => {
    
    let sortedList = [...areaIdList];
    sortedList.sort((a, b) => {
      const rankA = schoolsData[a]?.rank;
      const rankB = schoolsData[b]?.rank;
      
      if (rankA === undefined && rankB === undefined) {
        return 0; // Les deux objets n'ont pas de "rank", aucune différence de tri
      }
      if (rankA === undefined) {
        return 1; // L'objet A n'a pas de "rank", le placer après l'objet B
      }
      if (rankB === undefined) {
        return -1; // L'objet B n'a pas de "rank", le placer après l'objet A
      }
      
      return rankA - rankB    // comparaison normale si les deux sont definis
    });
    setSortedAreaList(sortedList);
    
  }, [schoolsData, areaIdList])


  if (sortedAreaList.length > 0) {
    return (
      <HorizontalScroll scrollViewSize={{ width: scrollWidth, height: scrollHeight,}}>
        {sortedAreaList.map(
          (schoolId, index) => (
            <View key={schoolId} style={[styles.innerScrollViewContainer, { width: scrollWidth / 2.3, height: scrollHeight },]}>
              <ExploreSchoolBanner schoolId={schoolId} />
            </View>
          )
        )}
      </HorizontalScroll>
    )
  } else {
    return (
      <View style={styles.emptyAreaMessage} > 
        <Text style={styles.emptyText}>{emptyAreaMessage}</Text>  
      </View>
    )
  }
  
}




const styles = StyleSheet.create({
  innerScrollViewContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // borderWidth: 1,
    flexWrap: "wrap",
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  emptyAreaMessage : { 
    alignItems: "center", 
    justifyContent: "center", 
    alignSelf: "center", 
    backgroundColor: Colors.white, 
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    // borderWidth: 1,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.grey,
  }
});
