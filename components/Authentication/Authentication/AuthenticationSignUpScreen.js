import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from "react-native";
import {TextInput, Button} from "react-native-paper";
import * as firebase from "firebase";

const AuthenticationSignUpScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const attemptSignUp = () => {
        if (!passwordsMatch()) {
            showErrorAlert("Passwords don't match", "Your passwords must match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {

        }).catch((err) => {
            showErrorAlert("Error signing up", err.message); // TODO: show custom messages depending on err.code
        })
    }

    const passwordsMatch = () => {
        return password === confirmPassword;
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

            <TextInput
                label="Confirm Password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
            />

            <Button
                onPress={attemptSignUp}
            >Sign Up</Button>

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

export default AuthenticationSignUpScreen
