import HomeScreen from './screens/HomeScreen'
import AnnouncementsScreen from './screens/AnnouncementsScreen';
import Login from './screens/Login';
import CalendarScreen from './screens/CalendarScreen';
import MapScreen from './screens/MapScreen';
import Profile from './screens/Profile';
import Loading from './screens/Loading';

import AuthContext from './context/AuthContext';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';

const Tab = createBottomTabNavigator();

export default function Navigator({navigation}) {
    const {authToken, email, isLoading, isSignOut} = useContext(AuthContext);

    if(isLoading) {
        return <Loading />;
    }
    return (
        <Tab.Navigator>
            {authToken != null ?
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
    )

}