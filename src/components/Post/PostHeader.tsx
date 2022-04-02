import React from 'react'
import { Feather } from '@expo/vector-icons';
import {FunctionComponent} from 'react'
import { View } from 'react-native';
import styled from "styled-components/native";
import Avatar from 'components/molecules/Avatar/Avatar'

interface PostHeaderProps {
    [key:string]: any
}
 
const PostHeader: FunctionComponent<PostHeaderProps> = (props) => {
    return (
        <Container>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <Avatar
                    source={{
                        uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80",
                    }}
                />
                <UserProfileName>{props.username}</UserProfileName>
            </View>
            <Feather name="more-horizontal" size={24} />
        </Container>
    );
}

const Container = styled.View`
    width: 100%;
    flex-direction: row;
    padding: 12px 8px;
    justify-content: space-between;
    align-items: center;
`;

const UserProfileName = styled.Text`
    font-weight: 600;
    font-size: 14px;
`;
 
export default PostHeader;