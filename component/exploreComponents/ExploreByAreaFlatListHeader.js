
import { View, StyleSheet, Text } from "react-native";
import HorizontalAreaScroll from "./HorizontalAreaScroll";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { Colors } from "../../constant/Colors";


export default function ExploreByAreaFlatListHeader({scrollWidth, scrollHeight}) {

  const likedSchoolObject = useSelector((state) => state.schoolReducer.likedSchoolObject);
  // const [likeList, setLikeList] = useState([]);

  // useEffect(()=> {
  //   const likedSchoolList = Object.keys(likedSchoolObject);
  //   const filteredSchool = likedSchoolList.filter(schoolId => {
  //     return likedSchoolObject[schoolId] ;
  //   });
  //   setLikeList(filteredSchool);
  // }, [likedSchoolObject])



  return (
    <>
      <MainTitle>Mes favoris</MainTitle>
          
      <HorizontalAreaScroll areaIdList={Object.keys(likedSchoolObject).filter(schoolId => likedSchoolObject[schoolId]) } sectionName={"favoris"} scrollWidth={scrollWidth} scrollHeight={scrollHeight} emptyAreaMessage="Like des écoles, elles apparaîtront ici" />

      <MainTitle marginTop={20}>Par spécialité</MainTitle>
      
    </>
  )
  
}


function MainTitle({children, marginTop}) {
  return (
    <View style={[styles.mainTitle, {marginTop: marginTop}]} > 
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
