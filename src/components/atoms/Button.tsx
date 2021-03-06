import React, { ComponentProps, FunctionComponent, useContext } from "react";
import {
    Pressable,
    StyleSheet,
    StyleSheetProperties,
    Text,
    TextStyle,
} from "react-native";
import ThemeContext from "theme/context";
import { pallete, ThemeProps } from "theme/theme";

interface ButtonProps extends ComponentProps<typeof Pressable> {
    label: string;
    variant: "primary" | "secondary" | "tertiary";
}

const Button: FunctionComponent<ButtonProps> = (props) => {
    const { variant, style: customStyles, ...rest } = props;
    const theme = useContext(ThemeContext) as ThemeProps;

    return (
        <Pressable style={[style.button, style[variant], customStyles]} {...rest}>
            <Text
                style={{
                    ...theme.textVariants.body,
                    // @ts-ignore
                    color: style[variant].color,
                    textAlign: "center",
                    textTransform: "capitalize",
                }}>
                {props.label}
            </Text>
        </Pressable>
    );
};

const style = StyleSheet.create({
    button: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        textAlign: "center",
        borderRadius: 4,
    },
    primary: {
        backgroundColor: pallete.primary,
        color: pallete.textWhite,
    },
    secondary: {
        backgroundColor: pallete.foreground,
        color: pallete.textDark,
        borderWidth: 1,
        borderColor: pallete.foreground,
    },
    tertiary: {},
});

export default Button;
