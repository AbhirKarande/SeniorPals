import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native'
import {createStackNavigator} from "@react-navigation/stack";
import RequestsHomeScreen from "../components/Requests/RequestsHomeScreen";
import RequestCreatorScreen from "../components/Requests/RequestCreateScreen";

const Stack = createStackNavigator();

// TODO: get requests from database
const RequestsScreen = (props) => {
    return(
        <Stack.Navigator
            initialRouteName="RequestsHome"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="RequestsHome"
            >
                {(navProps) =>
                    <RequestsHomeScreen
                        {...navProps}
                        stackNavigation={navProps.navigation}
                        {...props}
                    />
                }
            </Stack.Screen>
            <Stack.Screen
                name="RequestCreator"
                options={{
                    title: "Create a Request",
                    headerShown: true
                }}
            >
                {(navProps) =>
                    <RequestCreatorScreen
                        {...navProps}
                        stackNavigation={navProps.navigation}
                        {...props}
                    />
                }
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

})

export default RequestsScreen;