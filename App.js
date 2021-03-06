/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { useEffect, useReducer, useMemo } from 'react';
import {
  Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './views/context/AuthContext';

import storage from './views/storage/Storage';

import { createStackNavigator } from '@react-navigation/stack';
import { SERVER_URL} from 'react-native-dotenv'

import HomeScreen from './views/screens/HomeScreen'
import AnnouncementsScreen from './views/screens/AnnouncementsScreen';
import Login from './views/screens/Login';
import CalendarScreen from './views/screens/CalendarScreen';
import MapScreen from './views/screens/MapScreen';
import Profile from './views/screens/Profile'
import Quiz from './views/screens/Quiz';
import Results from './views/screens/Results';

import firebase from 'react-native-firebase';
const Stack = createStackNavigator();


function reducer(prevState, action) {
  switch(action.type) {
    case "RESTORE_TOKEN":
      return {...prevState, isLoading: false, authToken: action.authToken, id: action.id};
    case "LOG_IN":
      return {...prevState, isSignOut: false, authToken: action.authToken, id: action.id};
    case "LOG_OUT":
      return {...prevState, isSignOut: true, authToken: null, email: null};
    default:
      throw Error();
  }
}

async function storeCurrUser(payload) {
  try {
    await storage.set('curr_user', JSON.stringify(payload));
  }
  catch(e) {
    console.log(e)
  }
} 

export default function App() {
  const initalState = {isLoading : true, isSignOut: false, authToken: null, email: null};
  const [state, dispatch] = useReducer(reducer, initalState);

  // handle set up for push notifications
  // useEffect(() => {
  //   this.checkPermission();
  //   setUpNotifications();
  //   persistNotifications();
  // }, []);

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  }

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      this.showAlert("Your Firebase Token is:", fcmToken);
    } else {
      this.showAlert("Failed", "No token received");
    }
  }
    
  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  }
        
  const setUpNotifications = async () => {
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    const channel = new firebase.notifications.Android.Channel('main-channel', 'Main Channel', firebase.notifications.Android.Importance.Max).setDescription('My notification channel');
    // Create the channel
    firebase.notifications().android.createChannel(channel);
  }

  const persistNotifications = () => {
    notificationDisplayedListener();
    notificationListener();
    notificationOpenedListener();
  }

  const notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
    // Process your notification as required
    // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
  });

  const notificationListener = firebase.notifications().onNotification((notification) => {
    const { title, body } = notification;
    this.showAlert(title, body);
  });

  const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    // Get the action triggered by the notification being opened
    const action = notificationOpen.action;
    // Get information about the notification that was opened
    const notification = notificationOpen.notification;

  firebase.notifications().removeDeliveredNotification(notification.notificationId);
    const { title, body } = notificationOpen.notification;
    this.showAlert(title, body);
  });


  showAlert = (title, message) => {
    Alert.alert(
    title,
    message,
    [
      {text: "OK", onPress: () => console.log("OK Pressed")},
    ], {cancelable: false});
  };

  // handle authentication
  useEffect(() => {
    let loadToken = async () => {
      try {
        const raw = await storage.get('curr_user');
        if(raw) {
          const currUser = JSON.parse(raw);
          dispatch({type : "RESTORE_TOKEN", authToken : currUser.authToken, id : currUser.id})
        }
        else {
          dispatch({type : "RESTORE_TOKEN", authToken : null, id : null})
        }
      }
      catch(e) {
        console.log(e)
      }
    }
    loadToken();
  }, []);

  const authContext = useMemo(() => ({
    signIn: async (payload) => {
      let authToken = null;
      let email = null;
      // Calls login request
      await fetch(SERVER_URL + "/auth/login", {

          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body : JSON.stringify(payload)

      }).then((data) => data.json())
      .then((data) => {
          console.log(data);
          // Stores auth-token if successful
          if(data.message === undefined) {
            id = data.user.id;
            authToken = data.user.token;
            storeCurrUser({id, authToken});
            dispatch({type : "LOG_IN", authToken, id});
          }
      }).catch((err) => console.log(err));
    },
    signOut: async () => {
      // Destroy locally-stored token
      try {
        await storage.remove('curr_user');
      }
      catch(e) {
        console.log(e);
      }
      dispatch({type : "LOG_OUT"});
    },
    ...state
  }),[state]);

  return (
      <NavigationContainer>
        <AuthProvider value={authContext}>
          <Stack.Navigator>

              {state.authToken !== null ? 
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Map" component={MapScreen} />
                <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
                <Stack.Screen name="Calendar" component={CalendarScreen} />
                <Stack.Screen name="My Profile" component={Profile} />
                <Stack.Screen name="Quiz" component={Quiz} />
                <Stack.Screen name="Results" component={Results} />
              </>  
              : 
              <Stack.Screen name="Login" component={Login} />}
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
  );
}

