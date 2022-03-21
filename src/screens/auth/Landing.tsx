import { FunctionComponent } from "react";
import React from "react";
import { Button, SafeAreaView, View, TextInput } from "react-native";
import { useState } from "react";
import * as firebase from "firebase";
import {
    NavigationHelpers,
    StackActionHelpers,
    StackRouterOptions,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LandingScreenNavigationParams } from "navigation/types";

interface LandingProps
    extends NativeStackScreenProps<LandingScreenNavigationParams, "Landing"> {}

const Landing: FunctionComponent<LandingProps> = ({ navigation }) => {
    // const {router} = navigaton
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const onSignIn = () => {
        firebase.default
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                // console.log(result);
            })
            .catch((result) => {
                // console.log(result);
            });
    };
    return (
        <SafeAreaView>
            <View>
                <TextInput placeholder="email" onChangeText={setEmail} value={email} />
                <TextInput
                    placeholder="password"
                    onChangeText={setPassword}
                    value={password}
                />
                <Button title="Sign in" onPress={onSignIn} />
                <Button
                    title="Register"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default Landing;
