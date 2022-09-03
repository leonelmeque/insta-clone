import React from "react";
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
