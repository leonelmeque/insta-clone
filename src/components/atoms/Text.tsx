import React, { ComponentProps, FunctionComponent, useContext } from "react";
import { Text as RNText } from "react-native";
import ThemeContext from "theme/context";
import { pallete, theme, ThemeProps } from "theme/theme";

interface TextProps extends ComponentProps<typeof RNText> {
    color: keyof typeof pallete;
    variant: keyof typeof theme.textVariants;
}

const Text: FunctionComponent<TextProps> = ({
    children,
    variant="body",
    color="text",
    style,
    ...rest
}) => {
    const theme = useContext(ThemeContext) as ThemeProps;
 
    return (
        <RNText
            style={{
                color: theme.colors[color],
                ...theme.textVariants[variant],
                ...(style as object),
            }}
            {...rest}>
            {children}
        </RNText>
    );
};

export default Text;
