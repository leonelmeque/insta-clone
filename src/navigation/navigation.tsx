import React from 'react';

// Navigation imports
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Icons imports
import SvgSearchOutlined from '@components/Icons/react-icons/SearchOutlined';
import {
  HomeFilled,
  SearchOutlined,
  AddCircular,
  Heart,
} from '@components/Icons/react-icons';
import { Ionicons } from '@expo/vector-icons';

// Screens imports
import FeedScreen from '@screens/Feed';
import AddScreen from '@screens/Add';
import ExploreScreen from '@screens/Explore';
import RegisterScreen from '@screens/auth/Register';
import LandingScreen from '@screens/auth/Landing';
import MainScreen from '@screens/Main';
import UploadImage from '@screens/UploadImage';
import ProfileScreen from '@screens/Profile';

// Types Imports
import { LandingScreenNavigationParams,StackParamsList } from './types';
import { VoidFunctionComponent } from 'react';

// UI Components imports
import { Avatar } from '@components/Avatar';
import { View } from 'react-native';

// Creating navigators
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator<
  LandingScreenNavigationParams | any | StackParamsList
>();

const VoidComponent = () => {
  return <View></View>;
};

// Main Navigation
export const GlobalNavigation = () => (
  <Stack.Navigator initialRouteName='Main'>
    <Stack.Screen
      name='Main'
      component={MainScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name='Add' component={AddScreen} />
    <Stack.Screen
      name='UploadImage'
      options={{ title: 'Save Image' }}
      component={UploadImage}
    />
  </Stack.Navigator>
);

export const ExploreNavigation = () => (
  <Stack.Navigator initialRouteName='Explore' >
    <Stack.Screen
      name='Explore'
      component={ExploreScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name='Explore/Profile' options={(props)=>({
      title: props.route?.params?.profile,
      headerBackTitleVisible:false
    })} component={ProfileScreen} />
  </Stack.Navigator>
);

// App Tab navigation
export const AppTabNavigation = () => (
  <Tabs.Navigator
    initialRouteName='Home'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size, color }) => {
        switch (route.name) {
          case 'Home':
            return !focused ? (
              <HomeFilled />
            ) : (
              <HomeFilled />
            );
          case 'Explore':
            return !focused ? (
              <SearchOutlined />
            ) : (
              <SearchOutlined />
            );
          case 'NewPost':
            return <AddCircular />;
          case 'Activity':
            return <Heart />;
          case 'Profile':
            return (
              <Avatar
                size={size + 2}
                source={{
                  uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80',
                }}
              />
            );
        }
        return (
          <Ionicons name={'home'} size={32} color={color} />
        );
      },
    })}>
    <Tabs.Screen
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      name='Home'
      component={FeedScreen}
    />
    <Tabs.Screen
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      name='Explore'
      component={ExploreNavigation}
    />
    <Tabs.Screen
      listeners={({ navigation, route }) => ({
        tabPress: (event) => {
          event.preventDefault();
          navigation.navigate('Add');
        },
      })}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      name='NewPost'
      component={VoidComponent}
    />
    <Tabs.Screen
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      name='Activity'
      component={FeedScreen}
    />
    <Tabs.Screen
      options={{
        tabBarShowLabel: false,
      }}
      name='Profile'
      component={ProfileScreen}
    />
  </Tabs.Navigator>
);

//  Landing Screens Navigator
export const LandingScreenNavigation: VoidFunctionComponent =
  () => (
    <Stack.Navigator initialRouteName='Landing'>
      <Stack.Screen
        name='Landing'
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
