
import { View, StyleSheet, Text } from "react-native";
import HorizontalAreaScroll from "./HorizontalAreaScroll";
import { useSelector } from "react-redux";
// import { Colors } from "../../constant/Colors";


export default function ExploreByAreaFlatListHeader({scrollWidth, scrollHeight}) {

  const likedSchoolList = useSelector((state) => state.schoolReducer.likedSchoolList);
  

  return (
    <>
      <MainTitle>Mes favoris</MainTitle>
          
      <HorizontalAreaScroll areaIdList={likedSchoolList} scrollWidth={scrollWidth} scrollHeight={scrollHeight} emptyAreaMessage="Like des écoles, elles apparaîtront ici" />

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
