import { FunctionComponent } from "react";
import React from "react";
import { SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LandingScreenNavigationParams } from "navigation/types";
import LoginForm from "components/organisms/LoginForm";
import { useAuth } from "hooks";

interface LandingProps
    extends NativeStackScreenProps<LandingScreenNavigationParams, "landing/login"> {}

const Landing: FunctionComponent<LandingProps> = ({ navigation }) => {
    const {onSignIn} = useAuth()
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
