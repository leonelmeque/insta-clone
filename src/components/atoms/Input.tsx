import React, { ComponentProps, FunctionComponent } from "react";
import { StyleSheet, TextInput } from "react-native";

interface InputTextProps extends ComponentProps<typeof TextInput> {}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#BFBFBF",
        backgroundColor: "#E9E9E9",
        borderRadius: 4
    },
});

const InputText: FunctionComponent<InputTextProps> = ({
    style: customStyles,
    ...rest
}) => <TextInput style={[styles.container, customStyles]} {...rest}></TextInput>;



export default InputText;
