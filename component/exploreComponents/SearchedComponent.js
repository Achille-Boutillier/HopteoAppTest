import { View, StyleSheet, TextInput, ActivityIndicator, FlatList } from "react-native";
import { useState, useRef, useEffect } from "react";
import { Colors } from "../../constant/Colors";
// import PrimaryButton from "./buttons/PrimaryButton";
import store from "../../core";
import { getBannerData } from "../../BackEnd/controllers/school";
import { useDispatch } from "react-redux";
import ExploreSchoolBanner from "./ExploreSchoolBanner";
import MessageContainer from "../MessageContainer";
import { searchSchool } from "../../BackEnd/controllers/explore";
import { alertProvider } from "../../BackEnd/errorHandler";

export default function SearchedComponent({searchInput, isResearchSubmited, setIsResearchSubmited,scrollWidth, scrollHeight}) {
  const dispatch = useDispatch();
  const [schoolIdList, setSchoolIdList] = useState([]);
  const [isRequestOver, setIsRequestOver] = useState(false);


  async function loadMissingSchoolData(idList) {
    const schoolsData = store.getState().schoolReducer.schoolsData;
    const notMissingSchoolId = Object.keys(schoolsData).filter((item)=> schoolsData[item].nomEcole);
    const missingSchoolId = idList.filter((item)=>!notMissingSchoolId.includes(item));
    setSchoolIdList(idList);    // ici pour être effectué avant setIsRequestOver;
    if (missingSchoolId.length>0) {
      const data = await getBannerData(missingSchoolId, dispatch);
      if (data.success) {
        setIsRequestOver(true);
      } else {
        alertProvider();
      }
    } else {
      setIsRequestOver(true); 
    }
  }

  async function handleSubmitResearch() {
    const {schoolMatchId, success} = await searchSchool(searchInput);
    if (success) {
      loadMissingSchoolData(schoolMatchId);
    } else {
      alertProvider();
    }
  }

  useEffect(()=> {
    if (isResearchSubmited) {
      handleSubmitResearch();
      // setIsResearchSubmited(false);
    }
  }, [isResearchSubmited])

  useEffect(()=> {
    console.log(searchInput);
    setIsResearchSubmited(false);
    setIsRequestOver(false);
    setSchoolIdList([])
  }, [searchInput])


  if (isResearchSubmited) {

    if (isRequestOver) {
      if (schoolIdList?.length>0) {
        return (
          <FlatList
            data={schoolIdList}
            extraData={schoolIdList}      // mettre une 2eme data en liste ?
            keyExtractor={(item) => item + "explore"}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
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
  } else {
    return ;
    // <MessageContainer>Les résultats apparaitront une fois la recherche lancée</MessageContainer> 
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
