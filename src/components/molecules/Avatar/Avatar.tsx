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
        <Box margin="s" padding="s" style={container}>
            <Image style={{ ...avatar, ...(style as object) }} {...rest} />
            {!hideUsernameLabel && (
                <Text variant="body" color="secondary">
                    {username}
                </Text>
            )}
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
            // margin:
            //     props.style.margin || props.usernamePlacement === "right"
            //         ? "0px 8px 0px 0px"
            //         : "0px 0px 8px 0px",
            zIndex: props.zIndex || 0,
        },
    });

export default Avatar;
