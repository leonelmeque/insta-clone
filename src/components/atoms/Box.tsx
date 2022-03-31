import React, { ComponentProps, FunctionComponent, useContext } from "react";
import { View } from "react-native";
import ThemeContext from "theme/context";
import { spacing, ThemeProps } from "theme/theme";

interface BoxProps extends ComponentProps<typeof View> {
    margin: keyof typeof spacing;
    padding: keyof typeof spacing;
    backgroundColor?: string;
}

const Box: FunctionComponent<BoxProps> = ({
    children,
    margin,
    padding,
    backgroundColor,
    style,
    ...rest
}) => {
    const theme = useContext(ThemeContext) as ThemeProps;

    return (
        <View
            style={{
                margin: theme.spacing[margin],
                padding: theme.spacing[padding],
                ...style as object
            }}
            {...rest}>
            {children}
        </View>
    );
};

export default Box;
