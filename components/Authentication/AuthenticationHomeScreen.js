
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import { Button } from 'react-native-paper';

const AuthenticationHomeScreen = (props) => {
    const {navigation} = props;

    const pushLoginScreen = () => {
        navigation.push('Login');
    }

    const pushSignUpScreen = () => {
        navigation.push('Sign Up');
    }

    return(
        <View style={styles.container}>

            <View style={styles.buttons}>
                <Button
                    onPress={pushLoginScreen}
                >Login</Button>
                <Button
                    onPress={pushSignUpScreen}
                >Sign Up</Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        alignContent: 'center',
        justifyContent: 'space-around',
        width: "100%",
        height: "40%"
    }
});

export default AuthenticationHomeScreen

