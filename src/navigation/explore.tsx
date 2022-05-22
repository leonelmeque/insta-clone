import React from "react";

// Navigation imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Screens imports
import ExploreScreen from "screens/Explore";
import ProfileScreen from "screens/Profile";

// Types Imports
import { LandingScreenNavigationParams, StackParamsList } from "./types";

const Stack = createStackNavigator<
    LandingScreenNavigationParams | any | StackParamsList
>();

export const ExploreNavigation = () => (
    <Stack.Navigator initialRouteName="explorer/explore">
        <Stack.Screen
            name="explorer/explore"
            component={ExploreScreen}
            options={{ headerShown: false, title:'Explore' }}
            
        />
        <Stack.Screen
            name="explorer/profile"
            options={(props) => ({
                title: props.route?.params?.profile,
                headerBackTitleVisible: false,
            })}
            component={ProfileScreen}
        />
    </Stack.Navigator>
);
