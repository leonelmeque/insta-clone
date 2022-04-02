import React from "react";
import { FunctionComponent, useCallback, useState } from "react";
import { View, Button, TextInput } from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onSignUp } from "library/backend";

interface RegisterProps {}

const StyledInput = styled(TextInput)``;
const StyledButton = styled(Button)``;

const Register: FunctionComponent<RegisterProps> = (props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUserName] = useState<string>("");

    return (
        <SafeAreaView>
            <View>
                <StyledInput
                    placeholder="username"
                    onChangeText={(value) => setUserName(value)}
                />
                <StyledInput placeholder="email" onChangeText={setEmail} value={email} />
                <StyledInput
                    placeholder="password"
                    secureTextEntry
                    onChangeText={(value) => setPassword(value)}
                />
                <StyledButton title="Sign Up" onPress={() => onSignUp(email,password,username)} />
            </View>
        </SafeAreaView>
    );
};

export default Register;
