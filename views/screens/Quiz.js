import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../context/AuthContext'
import {StatusBar, SafeAreaView, Text, TouchableOpacity, View, Alert} from 'react-native';

export default function Quiz({navigation}) {
    const [index, setIndex] = useState(0);
    const [results, setResults] = useState([]);

    const {email, authToken} = useContext(AuthContext)

    const questions = ["one", "two", "three", "four", "five"]
    const options = ["A", "B", "C", "D", "E"]

    const handlePress = (val) => {
        setResults([...results, val]);
        setIndex(index + 1);
    }

    useEffect(() => {
        if(results.length >= questions.length) {
            const payload = {email, authToken, results}
            fetch('http://10.0.2.2:3000/results', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(payload)
            }).then((res) => res.json()).then((data) => {
                if(data.code === 200) {
                    navigation.navigate("Results");
                }
                else {
                    Alert.alert(
                        "Error",
                        "Unable to push results to server. " + data.message,
                        [
                            {
                                text: "Ok",
                                onPress: ()=>{navigation.navigate("My Profile")}
                            }
                        ]
                    );
                }
            }).catch(err => alert(err))

        }
    }, [index])

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={{flex : 1, backgroundColor : "#00FF00"}}>
                { index >= questions.length ? 
                <Text>loading</Text> 
                :
                <>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>{`${index}: ${questions[index]}`}</Text>
                    </View>
                    <View style={{flex: 9, alignContent: 'stretch'}}>
                        {options.map((curr, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => handlePress(index)} style={{flex: 1, flexGrow: 1}}>
                                    <View style={{backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', height: "90%"}}>
                                        <Text>
                                            {curr}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                            })
                        }
                    </View>
                </>       
                }
            </SafeAreaView>
        </>
    );
}