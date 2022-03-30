import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import PostCaption from "./PostCaption";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";
import PostLikes from "./PostLikes";
import PostSocialActions from "./PostSocialActions";

type FeedPostProps = {
    isLiked?: boolean;
    likes: any;
    comments: any[];
    isSaved: boolean;
    postDate: string;
    username: string;
    postId?: string;
    name: string;
    [key: string]: any;
};

const FeedPost = ({
    isLiked,
    likes,
    comments,
    isSaved,
    postDate,
    username,
    postId,
    downloadURL,
    ...rest
}: FeedPostProps) => {
    return (
        <StyledView>
            <PostHeader username={rest.user.username} />
            <PostImage
                source={{
                    uri: downloadURL,
                }}
            />
            <PostSocialActions hasLike={isLiked} isBookmarked={isSaved} />
            <PostLikes likes={likes} />
            <View>
                <PostCaption username={rest.user.username} caption={rest.caption} />
                <PostComments comments={comments} />
                <PostDate>{postDate}</PostDate>
            </View>
        </StyledView>
    );
};

const PostDate = styled.Text`
    font-size: 12px;
    color: #acacac;
    margin: 4px 0px;
`;

const TotalComments = styled.Text`
    color: #707070;
    margin: 6px 0px;
`;

const PostImage = styled.Image`
    width: 100%;
    height: 400px;
`;
const StyledView = styled.View`
    width: 100%;
    /* height: 400px; */
    /* background-color:blue; */
`;

const UserProfileName = styled.Text`
    font-weight: 600;
    font-size: 14px;
`;

const TopComments = styled.View`
    flex-direction: row;
    padding: 4px 0px;
`;

const UserCommentInput = styled.TextInput``;

export default FeedPost;
