import Box from "components/atoms/Box";
import Text from "components/atoms/Text";
import React from "react";
import styled from "styled-components/native";
import PostCaption from "./PostCaption";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
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
}: FeedPostProps) => (
    <Box>
        <PostHeader username={rest.user.username} />
        <PostImage
            source={{
                uri: downloadURL,
            }}
        />
        <PostSocialActions hasLike={isLiked} isBookmarked={isSaved} />
        <PostLikes likes={likes} />
        <Box>
            <PostCaption username={rest.user.username} caption={rest.caption} />
            <PostComments comments={comments} />
            <Text variant="body" color="textDark">
                {postDate}
            </Text>
        </Box>
    </Box>
);

export default FeedPost;
