// React imports
import React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

// Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import {
    LandingScreenNavigation,
    AppTabNavigation,
    GlobalNavigation,
} from "navigation/index";

// Service imports
import firebaseInit from "library/firebaseConfig";
import * as firebase from "firebase";
import { SafeAreaView } from "react-native-safe-area-context";

// Redux imports
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "store/reducers";
import thunk from "redux-thunk";
import ThemeProvider from "theme/context";
// Creating redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

//Initializing firebase
firebaseInit();

export default function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [state, setState] = useState<{
        loggenIn?: boolean;
        loaded?: boolean;
    }>({});

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

    if (!state?.loggenIn) {
        return (
            <ThemeProvider.Provider value={{}}>
                <NavigationContainer>
                    <LandingScreenNavigation />
                </NavigationContainer>
            </ThemeProvider.Provider>
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <GlobalNavigation />
            </NavigationContainer>
        </Provider>
    );
}
