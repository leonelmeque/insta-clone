import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "screens/Add";
import MainScreen from "screens/Main";
import UploadImage from "screens/UploadImage";
import { LandingScreenNavigationParams, StackParamsList } from "./types";
import RegisterScreen from "screens/auth/Register";
import LandingScreen from "screens/auth/Landing";
import { useUser } from "context/user-context";

const Stack = createStackNavigator<
    LandingScreenNavigationParams | any | StackParamsList
>();


export const GlobalNavigation = () => {
    const [userState, _] = useUser()
    return (
        <Stack.Navigator initialRouteName={!userState.user ? "landing/home" : "global/main"}>
            <Stack.Screen
                name="landing/home"
                component={LandingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="landing/register" component={RegisterScreen} />
            <Stack.Screen
                name="global/main"
                component={MainScreen}
                options={{ headerShown: false, title: 'Explore' }}
            />
            <Stack.Screen name="global/add" options={{ title: 'Add' }} component={AddScreen} />
            <Stack.Screen
                name="global/uploadImage"
                options={{ title: "Save Image" }}
                component={UploadImage}
            />
        </Stack.Navigator>
    )
};
