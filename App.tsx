// React imports
import React from "react";
import { useState } from "react";

// Navigation imports
import { NavigationContainer } from "@react-navigation/native";

// Service imports
import firebaseInit from "library/firebaseConfig";

// Redux imports
import { Provider } from "react-redux";
import ThemeProvider from "theme/context";
import { theme } from "theme/theme";
import store from "store";
import { UserProvider, useUser } from "context/user-context";

import Container from "./Container";

//Initializing firebase
firebaseInit();

export default function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    return (
        <UserProvider>
            <ThemeProvider.Provider value={darkMode ? {} : theme}>
                <Provider store={store}>
                    <NavigationContainer>
                       <Container />
                    </NavigationContainer>
                </Provider>
            </ThemeProvider.Provider>
        </UserProvider>
    );
}
