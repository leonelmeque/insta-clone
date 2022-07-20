// React imports
import React from "react";
import { useState } from "react";

// Navigation imports
import { NavigationContainer } from "@react-navigation/native";

// Service imports
import firebaseInit from "library/firebaseConfig";

// Redux imports
import ThemeProvider from "theme/context";
import { theme } from "theme/theme";
import { UserProvider, useUser } from "context/user-context";

import Container from "./Container";

//Initializing firebase
firebaseInit();

export default function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    return (
        <UserProvider>
            <ThemeProvider.Provider value={darkMode ? {} : theme}>
                <NavigationContainer>
                    <Container />
                </NavigationContainer>
            </ThemeProvider.Provider>
        </UserProvider>
    );
}
