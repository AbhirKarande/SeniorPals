import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native'
import RequestCreatorForm from "./RequestCreatorForm";

// TODO: get requests from database
const RequestCreatorScreen = (props) => {
    const {authenticated, user, stackNavigation} = props;

    const onFoodRequestCreated = () => {
        stackNavigation.pop();
    }

    return(
        <View style={styles.container}>
            <RequestCreatorForm
                user={user}
                onFoodRequestCreated={onFoodRequestCreated}
                style={styles.requestCreatorForm}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "white"
    },
    requestCreatorForm: {
        height: "100%",
        width: "100%",
        backgroundColor: "white"
    }
})

export default RequestCreatorScreen;