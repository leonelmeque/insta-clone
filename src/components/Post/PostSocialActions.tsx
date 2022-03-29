import React, { FunctionComponent } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Bookmark, Comment, Heart, HeartRed, Share } from "@components/Icons/react-icons";

interface PostSocialActionsProps {
    [key:string]: any
}
// This is a Stateful component
const PostSocialActions: FunctionComponent<PostSocialActionsProps> = (props) => {
    return (
        <Container>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    maxWidth: 110,
                    flex: 1,
                }}>
                {props.hasLike ? <HeartRed /> : <Heart />}
                <Comment />
                <Share />
            </View>
            {props.isBookmarked ? <Bookmark /> : <Bookmark />}
        </Container>
    );
};


const Container = styled.View`
    padding: 12px 8px;
    flex-direction: row;
    justify-content: space-between;
`;

export default PostSocialActions;
