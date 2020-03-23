import React, {Component} from 'react'
import { StatusBar, SafeAreaView, Text, TextInput, Button} from 'react-native'

export default class MyProfileScreen extends Component {
    // Actual login stuff
    // Login sends request to verify in normal manner (check user exists + bcrypt)
    // If valid login, create randon ass key
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : ""
        };
    }

    handleInput(field, text) {
        this.setState({
            [field] : text, 
        });
    }

    handleSubmit() {
        const payload = {email : this.state.email, password: this.state.password};
        this.getToken(payload)

    }

    async getToken(payload) {
        // NOTE: Replace with Local IP of device if using physical
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
        })
    }

    render() {
        return (
            <>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView style={{flex : 1, backgroundColor: "#00FF00"}}>
                    <Text style={{textAlign: "center"}}>Login</Text>
                    <TextInput style={{borderWidth: 2}} onChangeText={this.handleInput.bind(this, 'email')} value={this.state.email} />
                    <TextInput style={{borderWidth: 2}} onChangeText={this.handleInput.bind(this, 'password')} value={this.state.password} />
                    <Button title="Submit" onPress={this.handleSubmit.bind(this)} />
                </SafeAreaView>
            </>
        );
    }
}