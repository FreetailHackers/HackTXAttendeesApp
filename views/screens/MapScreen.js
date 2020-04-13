import React, {Component} from 'react'
import { StatusBar, SafeAreaView, Text } from 'react-native'

export default function MapScreen ({navigation}){
    // Actual login stuff
    // Login sends request to verify in normal manner (check user exists + bcrypt)
    // If valid login, create randon ass key
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={{flex : 1, backgroundColor: "#00FF00"}}>
                <Text>map screen</Text>
            </SafeAreaView>
        </>
    );
}