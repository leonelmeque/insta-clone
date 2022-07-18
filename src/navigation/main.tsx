import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "screens/Add";
import MainScreen from "screens/Main";
import UploadImage from "screens/UploadImage";
import { LandingScreenNavigationParams, StackParamsList } from "./types";


const Stack = createStackNavigator<
    LandingScreenNavigationParams | any | StackParamsList
>();


export const GlobalNavigation = () => (
    <Stack.Navigator initialRouteName="global/main">
        <Stack.Screen
            name="global/main"
            component={MainScreen}
            options={{ headerShown: false, title:'Explore' }}
        />
        <Stack.Screen name="global/add" options={{title:'Add'}} component={AddScreen} />
        <Stack.Screen
            name="global/uploadImage"
            options={{ title: "Save Image" }}
            component={UploadImage}
        />
    </Stack.Navigator>
);
