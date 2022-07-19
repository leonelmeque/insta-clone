import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "screens/auth/Register";
import LandingScreen from "screens/auth/Landing";
import { LandingScreenNavigationParams, StackParamsList } from "./types";
import { VoidFunctionComponent } from "react";

const Stack = createStackNavigator<
    LandingScreenNavigationParams | any | StackParamsList
>();

export const LandingScreenNavigation: VoidFunctionComponent = () => (
    <Stack.Navigator initialRouteName="landing/home">
        <Stack.Screen
            name="landing/home"
            component={LandingScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="landing/register" component={RegisterScreen} />
    </Stack.Navigator>
);
