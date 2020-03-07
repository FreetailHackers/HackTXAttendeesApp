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
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './views/HomeScreen'
import AnnouncementsScreen from './views/AnnouncementsScreen';
import MyProfileScreen from './views/MyProfileScreen';

const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
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
}
