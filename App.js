/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './views/HomeScreen'
import AnnouncementsScreen from './views/AnnouncementsScreen';
import MyProfileScreen from './views/MyProfileScreen';
import CalendarScreen from './views/CalendarScreen';
import MapScreen from './views/MapScreen';
import firebase from 'react-native-firebase';

const Tab = createBottomTabNavigator();

export default class App extends Component {
  async componentDidMount() {
        const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const action = notificationOpen.action;
            const notification: Notification = notificationOpen.notification;
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
componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
}

useEffect(() => {
    const enabled = async () => {
    try{
        await firebase.messaging().hasPermission();
    } catch{}

    if (enabled) {
        const fcmToken = async () => {
            try{
                await firebase.messaging().getToken();
            } catch{}
        };
    } else {
       try {
          await firebase.messaging().requestPermission();
          // User has authorised
        } catch (error) {
          // User has rejected permissions
     }
     this.notificationListener = firebase.notifications().onNotification((notification) => {
       notification.android.setChannelId('test-channel')
                   .android.setSmallIcon('ic_launcher');
       firebase.notifications().displayNotification(notification);
       const { title, body } = notification;
       this.showAlert(title, body);
 },[]);

this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    // Get the action triggered by the notification being opened
    const action = notificationOpen.action;
    // Get information about the notification that was opened
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
    firebase.notifications().removeDeliveredNotification(notification.notificationId);
    const { title, body } = notificationOpen.notification;
    this.showAlert(title, body);
});

 const notificationOpen = await firebase.notifications().getInitialNotification();
 if (notificationOpen) {
   const { title, body } = notificationOpen.notification;
   this.showAlert(title, body);
 }

 this.messageListener = firebase.messaging().onMessage((message) => {
  console.log(JSON.stringify(message));
 });

 this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });

 showAlert = (title, message) => {
     Alert.alert(
      title,
      message,
      [
       {text: "OK", onPress: () => console.log("OK Pressed")},
      ],
      {cancelable: false},
     );
    }
    
  render() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }





function MyStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="My Profile" component={MyProfileScreen} />
    </Tab.Navigator>
  );
}
 
}
