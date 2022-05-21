import Box from "components/atoms/Box";
import Button from "components/atoms/Button";
import InputText from "components/atoms/Input";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

type LoginFormProps = {
    handleSignIn: (email: string, password: string) => void;
    onPushRegisterScreen: () => void;
};

const { height } = Dimensions.get("screen");

const LoginForm = ({
    handleSignIn,
    onPushRegisterScreen,
}: LoginFormProps): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <Box style={styles.container}>
            <InputText placeholder="Email" onChangeText={setEmail} value={email} />
            <Box padding={12} />
            <InputText
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
            />
            <Box padding={12} />
            <Box>
                <Button
                    label="Sign in"
                    variant="primary"
                    onPress={() => handleSignIn(email, password)}
                />
                <Button
                    label="Register"
                    variant="tertiary"
                    onPress={() => {
                        // navigation.navigate("Register");
                        onPushRegisterScreen();
                    }}
                />
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        justifyContent: "center",
        height: height,
    },
});

export default LoginForm;
