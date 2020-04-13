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
      return {...prevState, isLoading: false, authToken: action.authToken, email: action.email};
    case "LOG_IN":
      return {...prevState, isSignOut: false, authToken: action.authToken, email: action.email};
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

    useEffect(() => {
      const enabled = async () => {
        try{
          firebase.messaging().hasPermission();
        } catch(err) {

        }
      }

      if (enabled) {
          const fcmToken = async () => {
              try{
                  firebase.messaging().getToken();
              } catch{}
          };
      } else {
         try {
            firebase.messaging().requestPermission();
            // User has authorised
          } catch (error) {
            // User has rejected permissions
        }
      }
      setUpNotifications();
      return persistNotifications();
      },[]);

    useEffect(() => {
      let loadToken = async () => {
        try {
          const raw = await storage.get('curr_user');
          if(raw) {
            const currUser = JSON.parse(raw);
            dispatch({type : "RESTORE_TOKEN", authToken : currUser.authToken, email : currUser.email})
          }
          else {
            dispatch({type : "RESTORE_TOKEN", authToken : null, email : null})
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
        await fetch("http://10.0.2.2:3000/login", {
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
            if(data.code === 200) {
              email = payload.email;
              authToken = data.authToken;
              storeCurrUser({email, authToken});
              dispatch({type : "LOG_IN", authToken, email});
            }
        });
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
        
    const setUpNotifications = async () => {
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
          const action = notificationOpen.action;
          const notification = notificationOpen.notification;
          var seen = [];
          alert(JSON.stringify(notification.data, function(key, val) {
              if (val != null && typeof val == "object") {
                  if (seen.indexOf(val) >= 0) {
                      return;
                  }
                  seen.push(val);
              }
              return val;
          }));
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
      notification.android.setChannelId('test-channel')
                  .android.setSmallIcon('ic_launcher');
      firebase.notifications().displayNotification(notification);
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

      var seen = [];
      alert(JSON.stringify(notification.data, function(key, val) {
          if (val != null && typeof val == "object") {
              if (seen.indexOf(val) >= 0) {
                  return;
              }
              seen.push(val);
          }
          return val;
      }));
    });


    const showAlert = (title, message) => {
      Alert.alert(
      title,
      message,
      [
        {text: "OK", onPress: () => console.log("OK Pressed")},
      ], {cancelable: false});
    };

    return (
        <NavigationContainer>
          <AuthProvider value={authContext}>
            <Stack.Navigator>
                <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Map" component={MapScreen} />
                <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
                <Stack.Screen name="Calendar" component={CalendarScreen} />
                <Stack.Screen name="My Profile" component={Profile} />
                <Stack.Screen name="Quiz" component={Quiz} />
                <Stack.Screen name="Results" component={Results} />
                </>
            </Stack.Navigator>
          </AuthProvider>
        </NavigationContainer>
    );
}
