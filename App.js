// import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StatusBar, 
  // AppState
 } from "react-native";
import { useState, useEffect,  } from "react";
import { Ionicons } from "@expo/vector-icons";
import CardsIcon from "./assets/icons/cardsIcon.svg";

import Home from "./screen/BottomTabScreen/Home";
import SchoolRanking from "./screen/BottomTabScreen/SchoolRanking";
import { Colors } from "./constant/Colors";
import SchoolPage from "./screen/SchoolPage";
import Settings from "./screen/SettingScreen/Settings";
import { BrandComponent } from "./component/TopBar";
import FirstQuestionsScreen from "./screen/FirstQuestionsScreen";
import SplashScreen from "./screen/SplashScreen";
import Login from "./screen/AuthScreen/Login";
import SignUp from "./screen/AuthScreen/SignUp";
import ModifyPassword from "./screen/SettingScreen/ModifyPassword";
import AppInfo from "./screen/SettingScreen/AppInfo";
import PrivacyPolicy from "./screen/SettingScreen/PrivacyPolicy";
import Explore from "./screen/BottomTabScreen/Explore";
import { Provider } from "react-redux";
import store from "./core";
import RecoveryCode from "./screen/AuthScreen/RecoveryCode";
import OnBoardScreen from "./screen/OnBoardScreen";
import { trackingFunction } from "./BackEnd/googleAnalyticsTracker";
import { trackingDesignation } from "./constant/trakingDesignation";
// import MatomoTracker, { MatomoProvider, useMatomo } from "matomo-tracker-react-native";
// import { Analytics, PageHit, Event } from 'expo-analytics';    //! erreur :  Constants.installationId has been deprecated in favor of generating and storing your own ID
// import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";

const BottomTab = createBottomTabNavigator();
const NativeStack = createNativeStackNavigator();

// import { createStackNavigator } from "@react-navigation/stack";
// const Stack = createStackNavigator();



export default function App() {
  // const [isScreenCharged, setIsScreenCharged] = useState(false);
  // const [initialRouteName, setInitialRouteName] = useState("Splash Screen");

  // const instance = new MatomoTracker({
  //   urlBase: 'https://hopteo.matomo.cloud', // required
  //   siteId: 2, // required, number matching your Matomo project
   
  // });

  return (
    // <MatomoProvider instance={instance}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            barStyle={"dark-content"}
            backgroundColor={Colors.backgroundColor}
          />
          <AllNavigationScreens/>
        </SafeAreaView>
      </Provider>
    // </MatomoProvider>
  );
  
}


// ============ screens globaux ======================================

function AllNavigationScreens() {

  // const { trackAppStart } = useMatomo();
  
  // useEffect(() => {
  //   trackAppStart();
  // }, []);

  // async function setupAnalytics() {
  //   const trackerId = 'G-QZ53RWJ51Q'; // Replace with your own tracking ID
  //   const tracker = new GoogleAnalyticsTracker(trackerId);

  //   await tracker.trackScreenView('Home'); // Example: Track a screen view

  //   const event = {
  //     category: 'Video',
  //     action: 'Play',
  //     label: 'The Big Lebowski',
  //     value: 123,
  //   };
  //   await tracker.trackEvent(event); // Example: Track a custom event

  //   // Get installation ID
  //   const installationId =
  //     await Application.androidId() || // For Android
  //     (await SecureStore.getItemAsync('installationId')) || // For iOS
  //     'UNKNOWN';
  //   console.log('Installation ID:', installationId);
  // };

  useEffect(() => {
    trackingFunction(trackingDesignation.actionName.appStart);
  }, []);

  return (
    <NavigationContainer>
      <NativeStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"Splash Screen"}
      >
        <NativeStack.Screen name="Splash Screen" component={SplashScreen} />
        <NativeStack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <NativeStack.Screen name="Signup Screen" component={SignUp} />
        <NativeStack.Screen name="Login Screen" component={Login} />
        <NativeStack.Screen name="RecoveryCode" component={RecoveryCode} />

        <NativeStack.Screen
          name="First Questions Screen"
          component={FirstQuestionsScreen}
          // initialParams={{backStatus: backStatus}}
        />
        <NativeStack.Screen
          name="Main Screens"
          component={ScreensWithBottomTab}
        />
        <NativeStack.Screen name="School Page" component={SchoolPage} />
        <NativeStack.Screen name="Settings" component={Settings} />
        <NativeStack.Screen
          name="Modify Password"
          component={ModifyPassword}
        />
        <NativeStack.Screen name="App Info" component={AppInfo} />
        <NativeStack.Screen
          name="Privacy Policy"
          component={PrivacyPolicy}
        />

        {/* <NativeStack.Group screenOptions={{ presetation: "modal"}}>

      </NativeStack.Group> */}
      </NativeStack.Navigator>
    </NavigationContainer>
  )
}




// ========== screen with bottom tab =================================


function ScreensWithBottomTab() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left", // ? vérif si fonctionne sur IOS
        // headerTransparent: true,
        headerStyle: { backgroundColor: Colors.backgroundColor },
        tabBarStyle: { backgroundColor: Colors.navBarColor },
        tabBarActiveTintColor: Colors.orange500,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          // headerStyle: {borderWidth: 5, borderColor: Colors.fullBlack, },  // s'applique à la view contenant le header

          headerTitle: () => <BrandComponent style={{marginLeft: "4%"}} />,
          // header
          title: "Swipe",
          tabBarLabel: "Swipe",
          tabBarIcon: ({ color, size }) => (
            <CardsIcon width={size + 5} height={size + 5} fill={color} />
            // <FontAwesome icon={cardsBlank} />   // marche pas
            // <FontAwesome icon={validIcon}/>
          ),
        }}
      />
      <BottomTab.Screen
        name="SchoolRanking"
        component={SchoolRanking}
        options={{
          headerTitle: () => <BrandComponent style={{marginLeft: "4%"}}/>,
          title: "School Ranking",
          tabBarLabel: "Classement",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ribbon" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={Explore}
        options={{
          headerTitle: () => <BrandComponent style={{marginLeft: "4%"}}/>,
          title: "Explore",
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
