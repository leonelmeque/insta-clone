import React from "react";
import { FunctionComponent, useCallback, useState } from "react";
import { Button, TextInput } from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onSignUp } from "library/backend";
import SignUpForm from "components/organisms/SignUpForm";

const Register = (): JSX.Element => {
    return (
        <SafeAreaView>
            <SignUpForm handleSignUp={onSignUp} />
        </SafeAreaView>
    );
};

export default Register;
