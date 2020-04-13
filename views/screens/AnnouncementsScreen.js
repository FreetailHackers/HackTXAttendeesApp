import React, {Component} from 'react'
import { StatusBar, SafeAreaView, Text } from 'react-native'

export default function AnnouncementsScreen ({navigation}) {
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={{flex : 1, backgroundColor: "#00FF00"}}>
                <Text>announcements</Text>
            </SafeAreaView>
        </>
    );
}