
import { View, StyleSheet, Text } from "react-native";
import HorizontalAreaScroll from "./HorizontalAreaScroll";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { Colors } from "../../constant/Colors";


export default function ExploreByAreaFlatListHeader({scrollWidth, scrollHeight}) {

  const likedSchoolObject = useSelector((state) => state.schoolReducer.likedSchoolObject);


  return (
    <>
      <MainTitle>Mes favoris</MainTitle>
          
      <HorizontalAreaScroll areaIdList={Object.keys(likedSchoolObject) } sectionName={"favoris"} scrollWidth={scrollWidth} scrollHeight={scrollHeight} emptyAreaMessage="Like des écoles, elles apparaîtront ici" />

      <MainTitle>Par spécialité</MainTitle>
      
    </>
  )
  
}


function MainTitle({children}) {
  return (
    <View style={styles.mainTitle} > 
      <Text style={styles.mainTitleText}>{children}</Text>  
    </View>
  )
}




const styles = StyleSheet.create({
  mainTitle: {
    marginLeft: 8,
    marginBottom: 15,
  },
  mainTitleText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
