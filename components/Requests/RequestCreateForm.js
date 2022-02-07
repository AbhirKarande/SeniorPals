import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, View} from "react-native";
import { Container, Content } from "native-base";
import {Button, TextInput} from "react-native-paper";
import FirestoreDataAgent from "../../data/FirestoreDataAgent";
import * as Location from 'expo-location';

const RequestCreatorForm = (props) => {
    const {user, onFoodRequestCreated} = props;

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");

    const dataAgent = new FirestoreDataAgent();

    const attemptSubmit = () => {
        if (loading) return;

        setLoading(true);

        // verify fields

        if (!verifyName(name)) {
            showAlert("Error: Name", "Name cannot be empty")
            setLoading(false);
            return false;
        }

        if (!verifyAddress(address)) {
            showAlert("Error: Address", "Address cannot be empty")
            setLoading(false);
            return false;
        }

        // if (!verifyDietaryRestrictions(dietaryRestrictions)) {
        //     showAlert("Error: Dietary Restrictions", "")
        //     setLoading(false);
        //     return false;
        // }

        // get location

        getLatLong().then((latLong) => {
            dataAgent.submitFoodRequest({
                user: user,
                name: name,
                address: address,
                dietaryRestrictions: dietaryRestrictions,
                location: latLong,
                timestamp: new Date().getTime()
            }).then(() => {
                showAlert("Success!", "Request Submitted")
                onFoodRequestCreated();
                setLoading(false);
            }).catch((err) => {
                showAlert("Error", err.toString())
                setLoading(false);
            })
        }).catch((err) => {
            showAlert("Error", err.toString());
            setLoading(false);
        })
    }

    const getLatLong = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            throw new Error("You must provide access to your location in order to make a request.");
        }

        const location = await Location.getCurrentPositionAsync({});
        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };
    }

    const showAlert = (title, desc) => {
        Alert.alert(
            title,
            desc
        );
    }

    const verifyName = (name) => {
        return name.length > 0;
    }

    const verifyAddress = (address) => {
        // TODO: check if address is actually an address?
        return address.length > 0;
    }

    const verifyDietaryRestrictions = (dietaryRestrictions) => {

        return true; // optional
    }

    return(
        <Container>
            <Content>
                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                />

                <TextInput
                    label="Address"
                    value={address}
                    onChangeText={text => setAddress(text)}
                />

                <TextInput
                    label="Description"
                    value={dietaryRestrictions}
                    onChangeText={text => setDietaryRestrictions(text)}
                />

                <Button
                    onPress={attemptSubmit}
                    loading={loading}
                >Submit</Button>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({

})

export default RequestCreatorForm;