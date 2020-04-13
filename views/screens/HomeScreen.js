import React, {Component} from 'react'
import { StatusBar, SafeAreaView, Button, Text, TouchableOpacity, StyleSheet, Image, View, FlatList} from 'react-native'


const rows = [
    { id: 0, text: 'Announcements' },
    { id: 1, text: 'Calendar' },
    { id: 2, text: 'Map' },
    { id: 3, text: 'Profile' },
  ]
  
  const extractKey = ({ id }) => id

export default function HomeScreen ({navigation}){
    return (
        <>
            <StatusBar barStyle='dark-content' />
                { <SafeAreaView style={styles.container}>
                    <Text style={styles.header} >Welcome to HackTX! </Text>
                    {/* renderItem = ({ item }) => {
                        <Text style={styles.row}>
                            {item.text}
                        </Text>
                    }  */}
                    {/* render() {
                        <FlatList
                            style={styles.container}
                            data={rows}
                            renderItem={this.renderItem}
                            keyExtractor={extractKey}
                        />
                    } */}
                    <TouchableOpacity onPress={() => navigation.navigate('Announcements')}>
                        <View style={styles.viewStyle}>
                            <Text> Announcements</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
                        <View style={styles.viewStyle}>
                            <Text> Calendar </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                        <View style={styles.viewStyle}>
                            <Text> Map </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('My Profile')}>
                        <View style={styles.viewStyle}>
                            <Text> Profile </Text>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView> }
        </>
    );
}



const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        alignItems:'center',
        paddingTop: 10
    },
    header: {
        marginTop: 20,
        fontSize: 30,
        color: '#000'
    },
    viewStyle: {
        width: 400,
        height:100,
        justifyContent: 'center',
        alignItems:'center', 
        marginBottom : 10,
        marginTop : 30,
        backgroundColor:'#6495ed',
        borderRadius:10
    },
    Text:{
        color:'#ffffff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontSize : 150,
        fontWeight: 'bold'
    }
  });
