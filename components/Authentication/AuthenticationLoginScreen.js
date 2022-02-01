import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from "react-native";
import {TextInput, Button} from "react-native-paper";
import * as firebase from "firebase";

const AuthenticationLoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const attemptLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {

        }).catch((err) => {
            showErrorAlert("Error signing in", err.message); // TODO: show custom messages depending on err.code
        })
    }

    const showErrorAlert = (title, desc) => {
        Alert.alert(
            title,
            desc
        );
    }

    return(
        <View style={styles.container}>
            <TextInput
                label="Email"
                autoCompleteType={"email"}
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <TextInput
                label="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />

            <Button
                onPress={attemptLogin}
            >Login</Button>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "white"
    }
});

export default AuthenticationLoginScreen
