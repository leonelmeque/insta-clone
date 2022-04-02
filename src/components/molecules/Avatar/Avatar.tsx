import React, { ComponentPropsWithRef, useEffect, VoidFunctionComponent } from "react";
import { Image, StyleSheet } from "react-native";
import Text from "components/atoms/Text";
import Box from "components/atoms/Box";

interface AvatarProps extends ComponentPropsWithRef<typeof Image> {
    size: number;
}

const Avatar: VoidFunctionComponent<AvatarProps> = ({ size, style, ...rest }) => {
    const { avatar } = styles({ size, style });
    return <Image style={{ ...avatar, ...(style as object) }} {...rest} />;
};

const styles = (props: any) =>
    StyleSheet.create({
        avatar: {
            width: props.size ? props.size : 32,
            height: props.size ? props.size : 32,
            borderRadius: 9999999,
            zIndex: props.zIndex || 0,
        },
    });

export default Avatar;
