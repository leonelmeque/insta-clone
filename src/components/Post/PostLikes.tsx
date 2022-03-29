import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { Avatar } from "@components/Avatar";
import styled from "styled-components/native";

interface PostLikesProps {
    [key: string]: any;
}

const PostLikes: FunctionComponent<PostLikesProps> = (props) => {
    return (
        <View style={{ paddingHorizontal: 8 }}>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
                <View
                    style={{
                        flexDirection: "row",
                        width: 60,
                        marginRight: 8,
                    }}>
                    <Avatar
                        style={{
                            borderWidth: 1,
                            borderColor: "#fff",
                            position: "absolute",
                            left: 0,
                        }}
                        zIndex={3}
                        size={24}
                        source={{
                            uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80",
                        }}
                    />
                    <Avatar
                        style={{
                            borderWidth: 1,
                            borderColor: "#fff",
                            position: "absolute",
                            left: "30%",
                        }}
                        zIndex={2}
                        size={24}
                        source={{
                            uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80",
                        }}
                    />
                    <Avatar
                        style={{
                            borderWidth: 1,
                            borderColor: "#fff",
                            position: "absolute",
                            left: "60%",
                        }}
                        zIndex={1}
                        size={24}
                        source={{
                            uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80",
                        }}
                    />
                </View>
                <Likes>
                    {props.likes?.length} Like
                    {props.likes?.length > 1 ? "s" : <></>}
                </Likes>
            </View>
        </View>
    );
};

const Likes = styled.Text`
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 4px;
`;

export default PostLikes;
