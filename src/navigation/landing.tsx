import React from "react";

// Navigation imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Icons imports
import {
    HomeFilled,
    SearchOutlined,
    AddCircular,
    Heart,
} from "components/atoms/Icons/react-icons";
import { Ionicons } from "@expo/vector-icons";

// Screens imports
import FeedScreen from "screens/Feed";
import AddScreen from "screens/Add";
import ExploreScreen from "screens/Explore";
import RegisterScreen from "screens/auth/Register";
import LandingScreen from "screens/auth/Landing";
import MainScreen from "screens/Main";
import UploadImage from "screens/UploadImage";
import ProfileScreen from "screens/Profile";

// Types Imports
import { LandingScreenNavigationParams, StackParamsList } from "./types";
import { VoidFunctionComponent } from "react";

// UI Components imports
import { View } from "react-native";


// Creating navigators
const Stack = createStackNavigator<
    LandingScreenNavigationParams | any | StackParamsList
>();

const VoidComponent = () => {
    return <View></View>;
};


//  Landing Screens Navigator
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
