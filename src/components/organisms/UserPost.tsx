import React from "react";
import Box from "components/atoms/Box";
import Text from "components/atoms/Text";
import PostCaption from "components/molecules/Post/PostCaption";
import PostComments from "components/molecules/Post/PostComments";
import PostHeader from "components/molecules/Post/PostHeader";
import PostImage from "components/molecules/Post/PostImage";
import PostLikes from "components/molecules/Post/PostLikes";
import PostSocialActions from "components/molecules/Post/PostSocialActions";

type UserPostProps = {
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

const UserPost = ({
    isLiked,
    likes,
    comments,
    isSaved,
    postDate,
    username,
    postId,
    downloadURL,
    ...rest
}: UserPostProps) => (
    <Box style={{backgroundColor:"#fff"}}> 
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

export default UserPost;
