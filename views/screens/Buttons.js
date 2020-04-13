import React, {Component} from 'react'
import { StatusBar, SafeAreaView, Button, Text } from 'react-native'

export default function Profile({notifications}) {
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={{flex : 1, backgroundColor: "#00FF00"}}>
                <Text>Welcome to HackTX</Text>
                <Button title="Press me" onPress={() => Alert.alert('Simple Button pressed')}/>
            </SafeAreaView>
        </>
    );

}