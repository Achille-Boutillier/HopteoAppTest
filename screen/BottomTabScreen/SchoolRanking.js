import {FlatList, StyleSheet, View, ActivityIndicator, Text, Share,} from "react-native";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { calculateNewRank, loadMissingSchoolData } from "../../BackEnd/rankingFunction1";
import { Colors } from "../../constant/Colors";

import * as MediaLibrary from 'expo-media-library';
import { captureRef, captureScreen } from 'react-native-view-shot';
import ViewShot from "react-native-view-shot";

import SchoolBanner from "../../component/SchoolBanner";
import MessageContainer from "../../component/MessageContainer";
import { HeaderButton } from "../../component/TopBar";
import { useSelector, useDispatch } from "react-redux";
import { setSwipeStateHasChanged} from "../../core/reducers/swipeReducer";
import store from "../../core";
import PrimaryButton from "../../component/buttons/PrimaryButton";
import InfoPopup from "../../component/popup/InfoPopup";


function SchoolRanking({ navigation, route }) {
  const schoolReducer = useSelector((state) => state.schoolReducer);
  const forRankingReducer = useSelector((state) => state.forRankingReducer);

  //! à tej
  useEffect(()=> {
    console.log("showRankingPopup -------------------", forRankingReducer.showRankingPopup)
  }, [forRankingReducer.showRankingPopup])

  const [readyToDisplayRank, setReadyToDisplayRank] = useState(false);
  const dispatch = useDispatch();

  

  // ---------- rank calcul -------------------------------------------
 
  useEffect(()=> {
    const swipeStateHasChanged = store.getState().swipeReducer.swipeStateHasChanged;
    const rankIdList = store.getState().schoolReducer.rankIdList;
    if (!swipeStateHasChanged ){
      if ( Array.isArray(rankIdList) ){
        console.log("[rankIdList]", rankIdList);
        loadMissingSchoolData(rankIdList, setReadyToDisplayRank, dispatch);
      } else {
        setReadyToDisplayRank(true);
      }
      
    }
  }, [])

  useEffect(() => {
    // 'focus' quand on atteri sur le screen; 'blur' quand on quitte
    const unsubscribe = navigation.addListener("focus", () => {
    const swipeStateHasChanged = store.getState().swipeReducer.swipeStateHasChanged;
      if (swipeStateHasChanged){    // if new calcul needed
        calculateNewRank(setReadyToDisplayRank, dispatch, "rankingScreen"); 
        dispatch(setSwipeStateHasChanged(false));
      } 
    });
    return unsubscribe;
  }, [navigation]);


  useEffect(()=> {
    console.log("je passe dans le reclassement")
    console.log("[rankIdList]", schoolReducer.rankIdList);
    if (schoolReducer.rankIdList && readyToDisplayRank) {
      (()=>setReadyToDisplayRank(false))();
      setTimeout(function() {
        console.log("Delayed message");
      }, 500);
      (()=>setReadyToDisplayRank(true))();
    }   
  }, [schoolReducer.rankIdList])



  // ---------------------- fin calcul ----------------------------------------------------

  // ---------------- capture & partage classement ------------------

  // const [status, requestPermission] = MediaLibrary.usePermissions();
  // // ...rest of the code remains same

  // if (status === null) {
  //   requestPermission();
  // }

  const viewShotRef = useRef();

  async function onPressCapture() {
   const imageURI = await viewShotRef.current.capture();
  //  Share.share()
  };


  // async function requestMediaLibraryPermission() {
  //   const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  
  //   if (status !== 'granted') {
  //     console.log('Permission not granted!');
  //   }
  // };

  

  // async function saveScreenshot(uri) {
  //   await requestMediaLibraryPermission();
  
  //   try {
  //     const asset = await MediaLibrary.createAssetAsync(uri);
  //     await MediaLibrary.createAlbumAsync('Screenshots', asset, false);
  //     console.log('Screenshot saved successfully!');
  //   } catch (error) {
  //     console.log('Error saving screenshot:', error);
  //   }
  // };

  // async function onPressCapture() {
  //   await captureScreen({
  //     format: 'jpg',
  //     quality: 0.8,
  //   }).then((uri) => {
  //     saveScreenshot(uri);
  //   });
  // };


  // ---------------------- fin capture --------------------------------



 // ------------ boutons header ---------------------------

  function onSettingsPress() {
    navigation.navigate("Settings");
  }

  useLayoutEffect(() => {
    // créer les boutons du header
    navigation.setOptions({
      headerRight: () => <HeaderButton onSettingsPress={onSettingsPress} />,
    });
  }, [navigation]);

// ---------------fin button header -------------------------------------

  return (
    <View style={styles.mainContainer}>
      {forRankingReducer.showRankingPopup 
        ? <InfoPopup message="Retourne swiper pour affiner ton classement"/>
        : null 
      }
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>Ton classement personnalisé</Text>
        <View style={styles.screenshotButtonContainer}>
          <PrimaryButton onPress={onPressCapture} name="share-social" size={30} color={Colors.orange500}/>
        </View>
      </View>
      <ViewShot style={styles.listContainer} ref={viewShotRef}>
        { readyToDisplayRank 
          ? (
            Array.isArray(schoolReducer.rankIdList)
              ? (
                <FlatList
                  data={schoolReducer.rankIdList}
                  // data={schoolReducer.rankIdList.slice(0, 40)}
                  // extraData={schoolReducer.rankIdList} 
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (<SchoolBanner schoolId={item} />);
                  } }
                />
              ): (
                <MessageContainer>{schoolReducer.rankIdList}</MessageContainer>
              )
            
          ) : (

            <View style={{flex: 1, justifyContent: "center", alignItems: "center"} }>
              <ActivityIndicator size="large" color={Colors.orange500} />
            </View>
      )

        }
        </ViewShot>
      
    </View>
  );
}

export default SchoolRanking;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    mainContainerColor: Colors.backgroundColor,
    // alignItems: "center",
    // padding: 10,
  },

  topContainer: {
    marginHorizontal: "5%",
    marginBottom: "5%",
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
  }, 
  titleText: {
    fontWeight: "500",
    fontSize: 18,
    color: Colors.grey,
    verticalAlign: "middle",
    // borderWidth: 1
  },

  screenshotButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    // paddingLeft: -5,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  listContainer: {
    alignSelf: "center",
    alignItems: "center",
    flex: 1,
    width: "90%",
    // padding: 5,
    // borderWidth: 1,
  },

});
