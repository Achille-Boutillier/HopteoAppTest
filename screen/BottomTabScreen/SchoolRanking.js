import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";

import { Colors } from "../../constant/Colors";
import {
  getSchool2,
  getSchoolRanking,
} from "../../BackEnd/controllers/classement";
import SchoolBanner from "../../component/SchoolBanner";
import MessageContainer from "../../component/MessageContainer";
import { HeaderButton } from "../../component/TopBar";
import { alertProvider } from "../../BackEnd/errorHandler";
import { useDispatch } from "react-redux";

function SchoolRanking({ navigation, route }) {
  const [rankList, setRankList] = useState(); // ?  si le screen se recharge pour une quelconque raison, ranklist devient vide : "continue de swiper..."
  // const [handler, setHandler] = useState(0) ;
  // const [chargingComponent, setChargingComponent]  = useState(true);
  const [componentToShow, setComponentToShow] = useState();
  const dispatch = useDispatch();

  // function updateSchool(school){
  //   const index = rankList.findIndex((uni)=> uni.id === school.id);
  //   if(index !== -1){
  //     rankList[index].like = school.like;
  //     setHandler(handler+1);
  //     return setRankList(rankList);
  //   }
  //   return console.error("index pas trouvé");
  // }

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //   const school = route?.params?.school;
  //   if (school) {
  //     updateSchool(school)
  //   }
  //     })
  //   }, [navigation, route?.params?.school])

  function loginScreenNavigation() {
    navigation.navigate("Login Screen");
  }

  async function loadSchoolRank() {
    console.log(
      "je passe dans loadSchoolRank ---------------------------------------------------"
    );
    const list = await getSchoolRanking();
    const list2 = await getSchool2(dispatch);
    list2();

    // console.log(list)
    if (list?.error) {
      alertProvider(loginScreenNavigation);
    } else {
      console.log("[rankList]", list);
      setRankList(list);
    }
  }

  // function updateList(newList) {
  //   setRankList(newList);
  //   setHandler(handler+1);
  // }

  // useEffect(() => {
  //     setComponentToShow(
  //       <FlatList
  //         data={rankList}
  //         renderItem={(schoolData) => {
  //           return (<SchoolBanner {...schoolData.item} setRankList={updateList} rankList={rankList}/>);
  //         }}
  //       />
  //     );

  // }, [rankList, handler])

  useEffect(() => {
    if (Array.isArray(rankList)) {
      setComponentToShow(
        <FlatList
          data={rankList}
          // extraData={rankList}     // todo : extraData permet de mettre à jour la flatList quand la data change
          keyExtractor={(item) => item.id}
          renderItem={(schoolData) => {
            return (
              <SchoolBanner
                {...schoolData.item}
                setRankList={() => {}}
                rankList={rankList}
              />
            );
            // return (<SchoolBanner {...schoolData.item} setRankList={updateList} rankList={rankList}/>);
          }}
        />
      );
    } else if (rankList?.message) {
      setComponentToShow(
        <MessageContainer>{rankList.message}</MessageContainer>
      );
    } else {
      setComponentToShow(
        <View>
          <ActivityIndicator size="large" color={Colors.orange500} />
        </View>
      );
    }
  }, [rankList]);

  useEffect(() => {
    // 'focus' quand on atteri sur le screen; 'blur' quand on quitte
    const unsubscribe = navigation.addListener("focus", () => {
      loadSchoolRank(); // TODO : set un charging screen le temps du chargement
    });
    return unsubscribe;
  }, [navigation]);

  function onSettingsPress() {
    navigation.navigate("Settings");
  }

  useLayoutEffect(() => {
    // créer les boutons du header
    navigation.setOptions({
      headerRight: () => <HeaderButton onSettingsPress={onSettingsPress} />,
    });
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>{componentToShow}</View>
    </View>
  );
  // <View style={styles.podiumContainer}></View>; // contener bleu à rajouter avant flatList
}

export default SchoolRanking;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    mainContainerColor: Colors.backgroundColor,
    alignItems: "center",
    // padding: 10,
  },
  // rankContainer: {
  //   flex: 1,
  //   width: "90%",
  //   alignItems: "center",
  //   backgroundColor: Colors.blue400,
  // },

  listContainer: {
    alignItems: "center",
    flex: 1,
    // borderWidth: 1,
    width: "90%",
    // padding: 5,
  },

  // },
});
