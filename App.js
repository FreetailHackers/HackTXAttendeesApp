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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './views/screens/HomeScreen'
import AnnouncementsScreen from './views/screens/AnnouncementsScreen';
import Login from './views/screens/Login';
import CalendarScreen from './views/screens/CalendarScreen';
import MapScreen from './views/screens/MapScreen';
import Profile from './views/screens/Profile'
import firebase from 'react-native-firebase';
import { AuthProvider } from './views/context/AuthContext';

import storage from './views/storage/Storage'

const Tab = createBottomTabNavigator();

function reducer(prevState, action) {
  switch(action.type) {
    case "RESTORE_TOKEN":
      return {...prevState, isLoading: false, authToken: action.authToken};
    case "LOG_IN":
      return {...prevState, isSignOut: false, authToken: action.authToken};
    case "LOG_OUT":
      return {...prevState, isSignOut: true, authToken: null};
    default:
      throw Error();
  }
}

async function storeToken(authToken) {
  try {
    const payload = authToken;
    await storage.set('auth_token', payload);
  }
  catch(e) {
    console.log(e)
  }
}

export default function App() {
    const initalState = {isLoading : true, isSignOut: false, authToken: null};
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
          const authToken = await storage.get('auth_token');
          console.log(authToken);
          dispatch({type : "RESTORE_TOKEN", authToken})
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
        // Calls login request
        await fetch("http://10.0.2.2:5000/login", {
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
              authToken = data.authToken;
              storeToken(data.authToken);
            }
        });
        console.log("before dispatch: " + authToken);
        dispatch({type : "LOG_IN", authToken});
      },
      signOut: async () => {
        // Destroy locally-stored token
        try {
          await storage.remove('auth_token');
        }
        catch(e) {
          console.log(e);
        }
        dispatch({type : "LOG_OUT"});
      }
    }),[]);

    return (
        <NavigationContainer>
          <AuthProvider value={authContext}>
            <Tab.Navigator>
              {state.authToken != null ?
                <>
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Calendar" component={CalendarScreen} />
                <Tab.Screen name="My Profile" component={Profile} />
                </>
                : <Tab.Screen name="Login" component={Login} />
              }
            </Tab.Navigator>
          </AuthProvider>
        </NavigationContainer>
    );
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


    >>>>>>> notifications
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
}
