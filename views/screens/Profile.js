import React, {useContext} from 'react';
import {StatusBar, SafeAreaView, Text, Button} from 'react-native';
import AuthContext from '../context/AuthContext';

export default function Profile({notifications}) {
    const { signOut } = useContext(AuthContext);
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={{flex : 1, backgroundColor : "#00FF00"}}>
                <Button title="Log out" onPress={() => signOut()} />
            </SafeAreaView>   
        </>
    )
}

