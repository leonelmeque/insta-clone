import React from 'react'
import { FunctionComponent } from "react";
import { View } from "react-native";
import styled from "styled-components/native";


interface PostCaptionProps {
    [key: string]: any;
}
// This component is a stateful component
// Because it has a translation feature
// Which will make a request to translate the caption
const PostCaption: FunctionComponent<PostCaptionProps> = (props) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <UserProfileName>{props.username}</UserProfileName>
            <Caption>{props.caption}</Caption>
        </View>
    );
};

const UserProfileName = styled.Text`
    font-weight: 600;
    font-size: 14px;
`;


const Caption = styled.Text`
    font-weight: 400;
    font-size: 15px;
    margin-left: 4px;
`;

export default PostCaption;
