import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

const MainTabsNavigator = (props) => {

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="people"
                    options={{
                        tabBarLabel: 'People',
                        tabBarIcon: ({ color, size, focused }) => (
                            <MaterialIcons name="food-bank" size={size} color={color} />
                        ),
                        title: "People"
                    }}
                >
                    {(navProps) =>
                        <PantriesScreen
                            {...navProps}
                            {...props}
                        />
                    }
                </Tab.Screen>
                <Tab.Screen
                    name="requests"
                    options={{
                        tabBarLabel: 'Requests',
                        tabBarIcon: ({ color, size, focused }) => (
                            <FontAwesome5 name="donate" size={size} color={color} />
                        ),
                        title: "Requests"
                    }}
                >
                    {(navProps) =>
                        <RequestsScreen
                            {...navProps}
                            {...props}
                        />
                    }
                </Tab.Screen>
                <Tab.Screen
                    name="settings"
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ color, size, focused }) => (
                            <FontAwesome5 name="cog" size={size} color={color} />
                        ),
                        title: "Settings"
                    }}
                >
                    {(navProps) =>
                        <SettingsScreen
                            {...navProps}
                            {...props}
                        />
                    }
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainTabsNavigator;