import { FunctionComponent } from "react";
import React from "react";
import { Button, SafeAreaView, View, TextInput } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LandingScreenNavigationParams } from "navigation/types";
import { onSignIn } from "library/backend";
import InputText from "components/atoms/Input";
import LoginForm from "components/organisms/LoginForm";

interface LandingProps
    extends NativeStackScreenProps<LandingScreenNavigationParams, "Landing"> {}

const Landing: FunctionComponent<LandingProps> = ({ navigation }) => {
   
    return (
        <SafeAreaView>
           <LoginForm />
        </SafeAreaView>
    );
};

export default Landing;
