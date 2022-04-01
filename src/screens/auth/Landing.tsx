import { FunctionComponent } from "react";
import React from "react";
import { Button, SafeAreaView, View, TextInput } from "react-native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LandingScreenNavigationParams } from "navigation/types";
import { onSignIn } from "library/backend";

interface LandingProps
    extends NativeStackScreenProps<LandingScreenNavigationParams, "Landing"> {}

const Landing: FunctionComponent<LandingProps> = ({ navigation }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <SafeAreaView>
            <View>
                <TextInput placeholder="email" onChangeText={setEmail} value={email} />
                <TextInput
                    placeholder="password"
                    onChangeText={setPassword}
                    value={password}
                />
                <Button title="Sign in" onPress={()=>onSignIn(email, password)} />
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
