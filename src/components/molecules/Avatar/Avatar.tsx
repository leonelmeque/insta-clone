import React, { ComponentPropsWithRef, VoidFunctionComponent } from "react";
import { Image, StyleSheet } from "react-native";
import Text from "components/atoms/Text";
import Box from "components/atoms/Box";

interface AvatarProps extends ComponentPropsWithRef<typeof Image> {
    size: number;
    zIndex?: number;
    username?: string;
    usernamePlacement?: "right" | "bottom";
    hideUsernameLabel?: boolean;
}

const Avatar: VoidFunctionComponent<AvatarProps> = ({
    usernamePlacement,
    username,
    hideUsernameLabel,
    size,
    style,
    ...rest
}) => {
    const { avatar, container } = styles({ usernamePlacement, size, style });
    return (
        <Box style={container}>
            <Image style={{ ...avatar, ...(style as object) }} {...rest} />
        </Box>
    );
};

const styles = (props: any) =>
    StyleSheet.create({
        container: {
            flexDirection: props.usernamePlacement === "right" ? "row" : "column",
            alignItems: "center",
        },
        avatar: {
            width: props.size ? props.size : 32,
            height: props.size ? props.size : 32,
            borderRadius: 9999999,
            zIndex: props.zIndex || 0,
        },
    });

export default Avatar;
