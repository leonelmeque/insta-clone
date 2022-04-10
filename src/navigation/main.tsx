import React from "react";

// Navigation imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Screens imports
import AddScreen from "screens/Add";
import MainScreen from "screens/Main";
import UploadImage from "screens/UploadImage";

// Types Imports
import { LandingScreenNavigationParams, StackParamsList } from "./types";

// Creating navigators
const Stack = createStackNavigator<
    LandingScreenNavigationParams | any | StackParamsList
>();


// Main Navigation
export const GlobalNavigation = () => (
    <Stack.Navigator initialRouteName="global/main">
        <Stack.Screen
            name="global/main"
            component={MainScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="global/add" component={AddScreen} />
        <Stack.Screen
            name="global/uploadImage"
            options={{ title: "Save Image" }}
            component={UploadImage}
        />
    </Stack.Navigator>
);
