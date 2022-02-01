import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from "react-native";

const AuthenticationRequiredMessage = (props) => {

    const showAuthenticationScreen = () => {

    }

    return(
        <View style={styles.container}>
            <Text>You must be signed in to view and make requests.</Text>
            <Button onPress={showAuthenticationScreen}>Sign In</Button>
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

export default AuthenticationRequiredMessage;