import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Alert, StatusBar } from "react-native";
import {Button} from "react-native-paper";
import * as firebase from "firebase";
import FirestoreDataAgent from "../data/FirestoreDataAgent";

const SettingsScreen = (props) => {
    const {authenticated, user} = props;

    const dataAgent = new FirestoreDataAgent();

    const attemptLogout = () => {
        firebase.auth().signOut();
        showAlert("Logged out", "")
    }

    const attemptCancelFoodRequest = () => {
        dataAgent.cancelFoodRequest(user).then(() => {
            showAlert("Success!", "Cancelled your food request")
        }).catch((err) => {
            showAlert("Error Cancelling Food Request", err.toString())
        })
    }

    const showAlert = (title, desc) => {
        Alert.alert(
            title,
            desc
        );
    }


    return(
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView
                    style={styles.scrollView}
                >
                    <Button
                        onPress={attemptLogout}
                        disabled={!authenticated}
                    >Logout</Button>
                    <Button
                        onPress={attemptCancelFoodRequest}
                        disabled={!authenticated}
                    >Cancel Food Request</Button>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:StatusBar.currentHeight,
        height: "100%",
        width: "100%",
        backgroundColor: "white",
    },
    scrollView: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
    }
});

export default SettingsScreen;