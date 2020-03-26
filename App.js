/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useReducer, useMemo } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

import HomeScreen from './views/HomeScreen'
import AnnouncementsScreen from './views/AnnouncementsScreen';
import Login from './views/Login';
import CalendarScreen from './views/CalendarScreen';
import MapScreen from './views/MapScreen';

import { AuthProvider } from './views/AuthContext';

import storage from './views/Storage'

import Text from 'react-native'

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
        dispatch({type : "SIGN_OUT"});
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
                </>
                : <Tab.Screen name="Login" component={Login} />
              }
            </Tab.Navigator>
          </AuthProvider>
        </NavigationContainer>
    );
}
