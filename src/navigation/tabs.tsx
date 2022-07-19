import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
    HomeFilled,
    SearchOutlined,
    AddCircular,
    Heart,
} from "components/atoms/Icons/react-icons";
import { Ionicons } from "@expo/vector-icons";
import FeedScreen from "screens/Feed";
import ProfileScreen from "screens/Profile";
import { LandingScreenNavigationParams, StackParamsList } from "./types";
import Avatar from "components/molecules/Avatar/Avatar";
import { View } from "react-native";
import { ExploreNavigation } from "./explore";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator<
    LandingScreenNavigationParams | any | StackParamsList
>();


const VoidComponent = () => {
    return <View></View>;
};

export const AppTabNavigation = () => (
    <Tabs.Navigator
        initialRouteName="tabs/home"
        defaultScreenOptions={{}}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size, color }) => {
                switch (route.name) {
                    case "tabs/home":
                        return !focused ? <HomeFilled /> : <HomeFilled />;
                    case "tabs/explore":
                        return !focused ? <SearchOutlined /> : <SearchOutlined />;
                    case "tabs/newPost":
                        return <AddCircular />;
                    case "tabs/activity":
                        return <Heart />;
                    case "tabs/profile":
                        return (
                            <Avatar
                                size={size + 2}
                                source={{
                                    uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80",
                                }}
                            />
                        );
                }
                return <Ionicons name={"home"} size={32} color={color} />;
            },
        })}>
        <Tabs.Screen
            options={{
                headerShown: false,
                tabBarShowLabel: false,
                title: 'Home'
            }}
            name="tabs/home"
            component={FeedScreen}
        />
        <Tabs.Screen
            options={{
                headerShown: false,
                tabBarShowLabel: false,
                title:'Explore'
            }}
            name="tabs/explore"
            component={ExploreNavigation}
        />
        <Tabs.Screen
            listeners={({ navigation, route }) => ({
                tabPress: (event) => {
                    event.preventDefault();
                    navigation.navigate("global/add");
                },
            })}
            options={{
                headerShown: false,
                tabBarShowLabel: false,
                title:'New Post'
            }}
            name="tabs/newPost"
            component={VoidComponent}
        />
        <Tabs.Screen
            options={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
            name="tabs/activity"
            component={FeedScreen}
        />
        <Tabs.Screen
            options={{
                tabBarShowLabel: false,
                title:'Profile'
            }}
            name="tabs/profile"
            component={ProfileScreen}
        />
    </Tabs.Navigator>
);
