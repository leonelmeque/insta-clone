import React, { ComponentProps, FunctionComponent } from "react";
import styled from "styled-components/native";
import { Image, StyleSheet } from "react-native";
interface PostImageProps extends ComponentProps<typeof Image>{
    [key: string]: any;
}

const PostImage: FunctionComponent<PostImageProps> = (props) => {
    return <Image style={style.postImage} {...props} />;
};

const style = StyleSheet.create({
    postImage: {
        width: "100%",
        height: 400,
    },
});

export default PostImage;
