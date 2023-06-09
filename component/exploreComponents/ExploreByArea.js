import { View, StyleSheet, FlatList, Text} from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "../../constant/Colors";
// import PrimaryButton from "./buttons/PrimaryButton";
import { useSelector, useDispatch } from "react-redux";
import HorizontalAreaScroll from "./HorizontalAreaScroll";
import store from "../../core";
import { getBannerData } from "../../BackEnd/controllers/school";
// import ExploreSchoolBanner from "./ExploreSchoolBanner";
// import MessageContainer from "../MessageContainer";
import ActivityComponent from "../ActivityComponent";
import ExploreByAreaFlatListHeader from "./ExploreByAreaFlatListHeader";




export default function ExploreByArea({scrollWidth, scrollHeight}) {
  // const test = ["ecole77", "ecole59"];
  
  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);
  const dispatch = useDispatch();


//------------ useSelector ---------------------------------------------------
  const schoolByArea = useSelector((state) => state.schoolReducer.schoolByArea);
  const [schoolByAreaState, setSchoolByAreaState] = useState(null);

  useEffect(()=> {
    setSchoolByAreaState(schoolByArea);
    console.log("on passe dans usefect pour setSchoolByAreaState -------------------------------");
    // console.log("[schoolByArea]", schoolByArea);
    // console.log(schoolByArea?.listFormation);
  }, [schoolByArea])
// -------- fin useSelector -----------------------------------------

  async function loadMissingSchoolData(idList) {
    idList = idList.filter((item, index)=> idList.indexOf(item)===index );    // delete redundant item
    const schoolsData = store.getState().schoolReducer.schoolsData;
    const notMissingSchoolId = Object.keys(schoolsData).filter((item)=> schoolsData[item].nomEcole);
    const missingSchoolId = idList.filter((item)=>!notMissingSchoolId.includes(item));
    console.log("[missingSchoolId length]", missingSchoolId.length);
    console.log("[notMissingSchoolId length]", notMissingSchoolId.length);
    if (missingSchoolId.length>0) {
      const data = await getBannerData(missingSchoolId, dispatch);
      if (data.success) {
        setIsReadyToDisplay(true);
      } else {
        alertProvider();
      }
    } else {
      setIsReadyToDisplay(true); 
    }
  }

  function handleMissingData(){
    let idList = [];
    for (let item of schoolByAreaState.listFormation) {    // ?schoolByAreaState est-il vraiment MAJ avec cette utilisation ?
      // console.log("[liste d'Id par section]",schoolByAreaState.schoolPack[item])
      idList = idList.concat(schoolByAreaState.schoolPack[item]);   //list1.concat(list2) concatène (=aditionne) les 2 listes
    }
    console.log("[idList] : ", idList)
    loadMissingSchoolData(idList);
  }


  useEffect(()=> {
    // console.log(schoolByAreaState)
    if (schoolByAreaState?.schoolPack ){
      handleMissingData();
    }
  }, [schoolByAreaState])

  

  if (!!schoolByAreaState && isReadyToDisplay) {
    // return <ActivityIndicator color={Colors.orange500} />
    return (

      <FlatList
        data={schoolByAreaState.listFormation}
        extraData={schoolByAreaState}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <ExploreByAreaFlatListHeader scrollHeight={scrollHeight} scrollWidth={scrollWidth} />}
        // style={{paddingLeft: 5}}
        // contentContainerStyle={{ paddingHorizontal: 0, borderWidth: 1  }}
        renderItem={(section) => {
          // console.log(schoolByAreaState.schoolPack[section.item]);

          return (
            <View style={{ marginBottom: 20, }}>
              <View style={{ marginBottom: 5, marginLeft: 10 }}><Text style={styles.subTitle}> {section.item} </Text></View>
              <HorizontalAreaScroll areaIdList={schoolByAreaState.schoolPack[section.item]} scrollWidth={scrollWidth} scrollHeight={scrollHeight} emptyAreaMessage="Cette section est vide" />
            </View>
          );
          
        }}
      />
    )
  } else {
    return <ActivityComponent/>
  }
  
}



// ============================================================================================

// function HorizontalAreaScroll({areaIdList, scrollWidth, scrollHeight}) {
//   // console.log(areaIdList);

//   // todo: ordonner par rang les écoles de areaIdList

//   return (
//     <HorizontalScroll scrollViewSize={{ width: scrollWidth, height: scrollHeight,}}>
//       {/* <Text>haha</Text> */}
//       {areaIdList.map(
//         (schoolId, index) => (
//           <View key={schoolId} style={[styles.innerScrollViewContainer, { width: scrollWidth / 2.3, height: scrollHeight },]}>
//             {/* <View style={{width: 15, height: 15, backgroundColor: Colors.blue400}} ></View> */}
//             <ExploreSchoolBanner schoolId={schoolId} />
//           </View>
//         )
//       )}
//     </HorizontalScroll>
//   )
// }

// ============================================================================================


const styles = StyleSheet.create({
  subTitle: {
    fontSize: 14,
    color: Colors.grey,
    fontWeight: "500",
  }
});
