import React, {Component} from 'react'
import { StatusBar, SafeAreaView, Button, Text, TouchableOpacity, StyleSheet, Image, View, FlatList} from 'react-native'


const rows = [
    { id: 0, title: 'Announcements', toGo: 'Announcements' },
    { id: 1, title: 'Calendar', toGo: 'Calendar'},
    { id: 2, title: 'Map', toGo: 'Map'},
    { id: 3, title: 'Profile', toGo: 'My Profile'},
  ]
  
  const extractKey = ({ id }) => id

export default function HomeScreen ({navigation}){
    return (
        <>
            <StatusBar barStyle='dark-content' />
                <SafeAreaView style={styles.container}>
                    {/* <Text style={styles.header} >Welcome to HackTX! </Text> */}
                    <FlatList 
                        data={rows}
                        renderItem={({item}) => <Item title={item.title} toGo={item.toGo} navigation={navigation} />}
                        keyExtractor = {item => String(item.id)}
                    />
                </SafeAreaView>
        </>
    );
}

function Item({title, toGo, navigation}) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(toGo)}>
            <View style={styles.viewStyle}>
                <Text>{title}</Text>
            </View>
        </TouchableOpacity>
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
