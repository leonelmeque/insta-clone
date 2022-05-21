import { FunctionComponent } from "react";
import React from "react";
import { SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LandingScreenNavigationParams } from "navigation/types";
import { onSignIn } from "library/backend";
import LoginForm from "components/organisms/LoginForm";

interface LandingProps
    extends NativeStackScreenProps<LandingScreenNavigationParams, "landing/login"> {}

const Landing: FunctionComponent<LandingProps> = ({ navigation }) => {
    return (
        <SafeAreaView>
            <LoginForm
                handleSignIn={onSignIn}
                onPushRegisterScreen={() => {
                    navigation.navigate("landing/register");
                }}
            />
        </SafeAreaView>
    );
};

export default Landing;
