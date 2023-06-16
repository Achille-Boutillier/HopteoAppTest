import {FlatList, StyleSheet, View, ActivityIndicator, Text, Platform} from "react-native";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { calculateNewRank, loadMissingSchoolData } from "../../BackEnd/rankingFunction";
import { Colors } from "../../constant/Colors";

import * as MediaLibrary from 'expo-media-library';
import * as Sharing from "expo-sharing";
// import * as Share from "react-native-share";   //! fonctionne pas : "cannot read 'facebook' property"
// import * as FileSystem from "expo-file-system";

// import {MediaLibrary} from "expo";
// import * as Permissions from "expo";
// import * as Permissions from "expo-permissions";
// import { GLView } from "expo-gl";
import { captureRef } from 'react-native-view-shot';
// import ViewShot from "react-native-view-shot";

import SchoolBanner from "../../component/SchoolBanner";
import MessageContainer from "../../component/MessageContainer";
import { BrandComponent, HeaderButton } from "../../component/TopBar";
import { useSelector, useDispatch } from "react-redux";
import { setSwipeStateHasChanged} from "../../core/reducers/swipeReducer"; 
import store from "../../core";
import PrimaryButton from "../../component/buttons/PrimaryButton";
import InfoPopup from "../../component/popup/InfoPopup";
import { alertProvider } from "../../BackEnd/errorHandler";


function SchoolRanking({ navigation}) {
  const schoolReducer = useSelector((state) => state.schoolReducer);
  const forRankingReducer = useSelector((state) => state.forRankingReducer);

  const [readyToDisplayRank, setReadyToDisplayRank] = useState(false);
  const [isScreenshotMode, setIsScreenshotMode] = useState(false);
  const dispatch = useDispatch();

  

  // ---------- rank calcul -------------------------------------------
 
  useEffect(()=> {
    const swipeStateHasChanged = store.getState().swipeReducer.swipeStateHasChanged;
    const rankIdList = store.getState().schoolReducer.rankIdList;
    if (!swipeStateHasChanged ){
      if ( Array.isArray(rankIdList) ){
        // console.log("[rankIdList]", rankIdList);
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
    // console.log("[rankIdList]", schoolReducer.rankIdList);
    if (schoolReducer.rankIdList && readyToDisplayRank) {
      (()=>setReadyToDisplayRank(false))();
      setTimeout(function() {
      }, 500);
      (()=>setReadyToDisplayRank(true))();
    }   
  }, [schoolReducer.rankIdList])



  // ---------------------- fin calcul ----------------------------------------------------

  // ---------------- capture & partage classement ------------------



  const viewRef = useRef();

  const [status, requestPermission] = MediaLibrary.usePermissions();

  function onPressCapture() {
    setIsScreenshotMode(true);
  }

  async function handlePressCapture() {

    if (Platform.OS === "ios") {
      setIsScreenshotMode(false);
      alertProvider("Fonctionnalité pour l'instant indisponible sur IOS. \n \nN'hésite pas à screen manuellement pour partager ton classement à tes amis ou à ta famille.", "Indisponible");
      return;
    }

    // ! Utiliser expo-camera ? ou un truc similaire

    console.log("[peut capturer screen ?]", status);
    if (!status.granted) {
      const {granted} = await requestPermission(); 

      if (granted) {
        onSaveImageAsync();
        // setIsScreenshotMode(false);
      } else {
        setIsScreenshotMode(false);
        alertProvider("Impossible d'effectuer la capture d'écran sans modifier les autorisations du smartphone.");
      }

    } else {
      onSaveImageAsync();
      // setIsScreenshotMode(false);
    }

  }


  async function onSaveImageAsync() {
    try {
      const localUri = await captureRef(viewRef, {
        // height: 440,
        format: "png",
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        setIsScreenshotMode(false);
        const isAvailable = await Sharing.isAvailableAsync();
        isAvailable ? Sharing.shareAsync(localUri) : alertProvider("La fonctionalité 'partage' est impossible avec cet appareil.");
        // Share.open({url: localUri, message: "Regarde mon classement d'école d'ingé sur Hopteo" })
        
      } else {
        setIsScreenshotMode(false);
        alertProvider("Une erreur est survenue, la capture d'écran n'a pas aboutie.");
      }
    } catch (e) {
      console.log(e);
      setIsScreenshotMode(false);
      alertProvider("Une erreur est survenue");
    }
  };


  useEffect(() => {
    if (isScreenshotMode) {
      handlePressCapture();
    }
  }, [isScreenshotMode])


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
    // <View style={styles.mainContainer}>
    <View style={styles.mainContainer} ref={viewRef} pointerEvents= {isScreenshotMode ? "none" : "auto"}>
      {forRankingReducer.showRankingPopup && !isScreenshotMode
        ? <InfoPopup message="Retourne swiper pour affiner ton classement" />
        : null 
      }
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>Ton classement</Text>
        <View style={styles.screenshotButtonContainer} >
          <PrimaryButton onPress={onPressCapture} name="share-social" size={30} color={Colors.orange500}/>
        </View>
      </View>

      {isScreenshotMode 
        ? <View style={styles.brandForScreenshot}><BrandComponent marginLeft={0}/></View>
        : null
      }

      <View style={styles.listContainer} >
        { readyToDisplayRank 
          ? (
            Array.isArray(schoolReducer.rankIdList)
              ? (
                <FlatList
                  data={schoolReducer.rankIdList}
                  // data={schoolReducer.rankIdList.slice(0, 40)}
                  // extraData={schoolReducer.rankIdList} 
                  keyExtractor={(item) => item + "rank"}
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
      </View>
      
    </View>
    // </View>
  );

  // return (
  //   <View style={styles.mainContainer}>
  //     <View style={styles.container1}></View>
  //     <View style={styles.container2}></View>
  //     <View style={styles.container3}></View>
  //   </View>
  // )
}

export default SchoolRanking;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    mainContainerColor: Colors.backgroundColor,
    // alignItems: "center",
    // padding: 10,
  },

  capturedContainer: {
    flex: 1,
  },

  topContainer: {
    marginHorizontal: "5%",
    marginBottom: "5%",
    marginTop: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
  }, 
  brandForScreenshot: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    // width: "100%",
    backgroundColor: Colors.backgroundColor,
    alignItems: "center",
    // paddingTop: "4%",
    // borderWidth: 1

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
