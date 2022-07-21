import React from "react";
import Box from "components/atoms/Box";
import Text from "components/atoms/Text";
import PostCaption from "components/molecules/Post/PostCaption";
import PostComments from "components/molecules/Post/PostComments";
import PostHeader from "components/molecules/Post/PostHeader";
import PostImage from "components/molecules/Post/PostImage";
import PostLikes from "components/molecules/Post/PostLikes";
import PostSocialActions from "components/molecules/Post/PostSocialActions";
import { PostProps } from "library/types";

type UserPostProps = {
   ownerID: string
   post: PostProps
};

const UserPost = ({ownerID, post}: UserPostProps) => (
    <Box style={{backgroundColor:"#fff"}}> 
        <PostHeader username={ownerID} />
        <PostImage
            source={{
                uri: post.imageUrl,
            }}
        />
        <PostSocialActions hasLike={post.isLiked} isBookmarked={post.isSaved} />
        <PostLikes likes={post.likes} />
        <Box>
            <PostCaption username={post.username} caption={post.caption} />
            <PostComments comments={post.comments} />
            <Text variant="body" color="textDark">
                {post.postDate}
            </Text>
        </Box>
    </Box>
);

export default UserPost;
