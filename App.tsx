// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppTabNavigation from '@navigation/index';
import firebaseInit from '@library/firebaseConfig';
// import { API_KEY } from 'src/library/constants';
//Initializing firebase
firebaseInit();

export default function App() {
  return (
    <NavigationContainer>
      <AppTabNavigation />
    </NavigationContainer>
  );
}
