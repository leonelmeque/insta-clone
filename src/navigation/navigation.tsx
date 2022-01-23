import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@screens/Home';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '@components/Avatar';
import SvgSearchOutlined from '@components/Icons/react-icons/SearchOutlined';
import {
  HomeFilled,
  SearchOutlined,
  AddCircular,
  Heart,
} from '@components/Icons/react-icons';
import Explore from '@screens/Explore';
import Register from '@screens/auth/Register';
import { VoidFunctionComponent } from 'react';
import Landing from '@screens/auth/Landing';
import { LandingScreenNavigationParams } from './types';

// Creating navigators
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator<LandingScreenNavigationParams>();


// Main app navigation
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
      component={Home}
    />
    <Tabs.Screen
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      name='Explore'
      component={Explore}
    />
    <Tabs.Screen
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      name='NewPost'
      component={Home}
    />
    <Tabs.Screen
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      name='Activity'
      component={Home}
    />
    <Tabs.Screen
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      name='Profile'
      component={Home}
    />
  </Tabs.Navigator>
);

export const LandingScreenNavigation: VoidFunctionComponent =
  () => (
    <Stack.Navigator initialRouteName='Landing'>
      <Stack.Screen
        name='Landing'
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
       
      />
    </Stack.Navigator>
  );


