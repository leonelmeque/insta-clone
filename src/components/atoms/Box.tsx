import React, { ComponentProps, FunctionComponent, useContext } from "react";
import { View } from "react-native";
import ThemeContext from "theme/context";
import { spacing, ThemeProps } from "theme/theme";

interface BoxProps extends ComponentProps<typeof View> {
    margin?: keyof typeof spacing | number;
    padding?: keyof typeof spacing | number;
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
                margin: typeof margin === 'string' ? theme.spacing[margin] : margin || 0,
                padding: typeof padding === 'string' ? theme.spacing[padding] : padding || 0,
                ...style as object
            }}
            {...rest}>
            {children}
        </View>
    );
};

export default Box;
