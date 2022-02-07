import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native'
import { FAB } from 'react-native-paper';
import MapListView from "../MapListView/MapListView";
import AuthenticationScreen from "../../screens/AuthenticationScreen";
import FirestoreDataAgent from "../../data/FirestoreDataAgent";

// TODO: get requests from database
const RequestsHomeScreen = (props) => {
    const {authenticated, user, stackNavigation} = props;

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        stackNavigation.addListener("focus", () => {
            if (authenticated) {
                getRequests(); // TODO: optimize instead of doing a full refresh?
            }
        });
    }, [stackNavigation, authenticated])

    const dataAgent = new FirestoreDataAgent();

    const getRequests = () => {
        dataAgent.getRequests().then((requests) => {
            requests = processDataForMap(requests);
            setRequests(requests);
        }).catch((err) => {

        })
    }

    const processDataForMap = (requests) => {
        requests.forEach((request) => {
            const dateOfRequest = new Date(request.timestamp);
            request.title = `${request.name} - ${dateOfRequest.toLocaleString()}`
        })
        return requests;
    }

    const showRequestCreator = () => {
        stackNavigation.push("RequestCreator")
    }

    if (authenticated) {
        return(
            <View>
                <MapListView
                    data={requests}
                    dataType={"requests"}
                />
                <FAB
                    style={styles.plusButton}
                    medium
                    icon="plus"
                    onPress={showRequestCreator}
                />
            </View>
        )
    } else {
        // TODO: use stack navigator to push authentication screen to stack?
        return(
            <AuthenticationScreen />
        )
    }
}

const styles = StyleSheet.create({
    plusButton: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: Platform.OS === "android" ? 50 : 0
    }
})

export default RequestsHomeScreen;