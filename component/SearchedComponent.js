import { View, StyleSheet, TextInput, ActivityIndicator, FlatList } from "react-native";
import { useState, useRef, useEffect } from "react";
import { Colors } from "../constant/Colors";
// import PrimaryButton from "./buttons/PrimaryButton";
import store from "../core";
import { getBannerData } from "../BackEnd/controllers/school";
import { useDispatch } from "react-redux";
import ExploreSchoolBanner from "./ExploreSchoolBanner";
import MessageContainer from "./MessageContainer";

export default function SearchedComponent({searchedIdList, scrollWidth, scrollHeight}) {
  const dispatch = useDispatch();
  const [schoolIdList, setSchoolIdList] = useState(null);
  const [displayResearch, setDisplayResearch] = useState();

  async function loadMissingSchoolData(idList) {
    const schoolsData = store.getState().schoolReducer.schoolsData;
    const notMissingSchoolId = Object.keys(schoolsData).filter((item)=> schoolsData[item].nomEcole);
    const missingSchoolId = idList.filter((item)=>!notMissingSchoolId.includes(item));

    if (missingSchoolId.length>0) {
      const data = await getBannerData(missingSchoolId, dispatch);
      if (data.success) {
        setDisplayResearch(true);
      } else {
        alertProvider();
      }
    } else {
      setDisplayResearch(true); 
    }
  }

  useEffect(()=> {
    if (searchedIdList) {
      // (()=> setDisplayResearch(false))()    //executer le "set" instantanément
      loadMissingSchoolData(searchedIdList);
      setSchoolIdList(searchedIdList);
    } else {
      setDisplayResearch(false);
      setSchoolIdList(null);
    }
    
  }, [searchedIdList])


  if (!searchedIdList) {
    return <MessageContainer>Lance vite ta recherche !</MessageContainer> 
  } else {

    if (displayResearch) {
      if (schoolIdList?.length>0) {
        return (
          <FlatList
            data={schoolIdList}
            extraData={schoolIdList}      // mettre une 2eme data en liste ?
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            key={2} // obligatoire avec numColumns
            renderItem={({ item }) => {
              return (
                <View
                  style={[
                    styles.innerScrollViewContainer,
                    // scrollViewSize,
                    { width: scrollWidth / 2, height: scrollHeight },
                  ]}
                >
                  <ExploreSchoolBanner schoolId={item} /> 
                </View>
              );
            }}
          />
        )
      } else {
        return <MessageContainer>Aucune école ne correspond à cette recherche</MessageContainer>
      }
    } else {
      return <ActivityIndicator color={Colors.orange500} />
    }
  }
  
}

const styles = StyleSheet.create({
  innerScrollViewContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // borderWidth: 1,
    flexWrap: "wrap",
    padding: 6,
  },
});
