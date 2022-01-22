// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import firebaseInit from '@library/firebaseConfig';
import {
  LandingScreenNavigation,
  AppTabNavigation,
} from '@navigation/index';
import * as firebase from 'firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { API_KEY } from 'src/library/constants';
//Initializing firebase
firebaseInit();

export default function App() {
  const [state, setState] = useState<{
    loggenIn?: boolean;
    loaded?: boolean;
  }>({});

  useEffect(() => {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (!user) {
        setState({
          loggenIn: false,
          loaded: true,
        });
      } else {
        setState({
          loggenIn: true,
          loaded: true,
        });
      }
    });
  });

  if (!state?.loaded) {
    return (
      <SafeAreaView>
        <View>
          <Text>Loading app</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (state?.loggenIn) {
    return (
      <NavigationContainer>
        <LandingScreenNavigation />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <AppTabNavigation />
    </NavigationContainer>
  );
}
