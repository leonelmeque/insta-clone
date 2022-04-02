import Box from "components/atoms/Box";
import Text from "components/atoms/Text";
import React from "react";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";

interface PostCaptionProps {
    [key: string]: any;
}
// This component is a stateful component
// Because it has a translation feature
// Which will make a request to translate the caption
const PostCaption: FunctionComponent<PostCaptionProps> = (props) => {
    return (
        <Box style={style.container}>
            <Text variant="body" style={style.username} color="textDark">
                {props.username}
            </Text>
            <Text variant="body" color="textDark" style={style.caption}>
                {props.caption}
            </Text>
        </Box>
    );
};

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    username: {
        fontWeight: "600",
        fontSize: 14,
    },
    caption: {
        fontWeight: "400",
        fontSize: 15,
        marginLeft: 4,
    },
});

export default PostCaption;
