import Box from "components/atoms/Box";
import Button from "components/atoms/Button";
import InputText from "components/atoms/Input";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components";

interface SignUpFormProps {
    handleSignUp: (...args: any) => void;
}

const {height} = Dimensions.get('screen')

const SignUpForm = ({handleSignUp}: SignUpFormProps): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUserName] = useState<string>("");

    return (
      
            <Box style={style.container}>
                <InputText
                    placeholder="username"
                    onChangeText={(value) => setUserName(value)}
                />
                <Box padding={12} />
                <InputText placeholder="email" onChangeText={setEmail} value={email} />
                <Box padding={12} />
                <InputText
                    placeholder="password"
                    textContentType="password"
                    secureTextEntry
                    onChangeText={(value) => setPassword(value)}
                />
                <Box padding={12} />
                <Button
                    label="Sign Up"
                    variant="primary"
                    onPress={() => handleSignUp(email, password, username)}
                />
            </Box>
   
    );
};

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        justifyContent:'center',
        height: height/2
    }
})

export default SignUpForm;
