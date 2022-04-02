import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import  Avatar from "components/molecules/Avatar/Avatar";
import styled from "styled-components/native";
import Box from "components/atoms/Box";

interface PostLikesProps {
    [key: string]: any;
}

const PostLikes: FunctionComponent<PostLikesProps> = (props) => {
    const arr = Array.from([1, 2, 3]);
    const users = arr.map(
        (num): JSX.Element => (
            <Avatar
                key={num}
                style={{
                    borderWidth: 1,
                    borderColor: "#fff",
                    position: "relative",
                    top: 0,
                    left: `-${(num - 1) * 30}%`,
                    zIndex: num ,
                }}
                size={24}
                source={{
                    uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80",
                }}
            />
        )
    );

    return (
        <Box
            style={{
                paddingHorizontal: 8,
                height: 30,
                position: "relative",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 4,
            }}>
            {users}
            <Text
                style={{
                    position:'relative',
                    left:'-60%'
                }}
            >
                {props.likes?.length} Like
                {props.likes?.length > 1 ? "s" : <></>}
            </Text>
        </Box>
    );
};


export default PostLikes;
