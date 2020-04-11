/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
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

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
  /*
  componentWillMount() {
  	  firebase.messaging().getToken()
  .then(fcmToken => {
    if (fcmToken) {
      console.log(fcmToken);
    } else {
      // user doesn't have a device token yet
    } 
  });
  }
  */
}
