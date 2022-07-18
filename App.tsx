// React imports
import React from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";

// Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { LandingScreenNavigation } from "navigation/landing";
import { GlobalNavigation } from "navigation/main";

// Service imports
import firebaseInit from "library/firebaseConfig";
import * as firebase from "firebase";
import { SafeAreaView } from "react-native-safe-area-context";

// Redux imports
import { Provider } from "react-redux";
import ThemeProvider from "theme/context";
import { theme } from "theme/theme";
import store from "store";
// Creating redux store


//Initializing firebase
firebaseInit();

export default function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [state, setState] = useState<{
        loggenIn?: boolean;
        loaded?: boolean;
    }>({});

    let [fontsLoaded] = useFonts({
        "MerriweatherSans-Regular": require("assets/fonts/MerriweatherSans-Regular.ttf"),
    });

    useEffect(() => {
        if (!state.loggenIn) {
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
        }
    },[state]);

    if (!state?.loaded && !fontsLoaded) {
        return (
            <SafeAreaView>
                <View>
                    <Text>Loading app</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!state?.loggenIn) {
        return (
            <ThemeProvider.Provider value={darkMode ? {} : theme}>
                <NavigationContainer>
                    <LandingScreenNavigation />
                </NavigationContainer>
            </ThemeProvider.Provider>
        );
    }

    return (
        <ThemeProvider.Provider value={darkMode ? {} : theme}>
            <Provider store={store}>
                <NavigationContainer>
                    <GlobalNavigation />
                </NavigationContainer>
            </Provider>
        </ThemeProvider.Provider>
    );
}
