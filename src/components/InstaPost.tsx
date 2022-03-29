import { Avatar } from "@components/Avatar";
import { Bookmark, Comment, Heart, Share, HeartRed } from "@components/Icons/react-icons";
import { Ionicons, Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

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
            <PostHeader>
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
                    <UserProfileName>{rest.user.username}</UserProfileName>
                </View>
                <Feather name="more-horizontal" size={24} />
            </PostHeader>
            <PostImage
                source={{
                    uri: downloadURL,
                }}
            />
            <UserActions>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        maxWidth: 110,
                        flex: 1,
                    }}>
                    {isLiked ? <HeartRed /> : <Heart />}
                    <Comment />
                    <Share />
                </View>
                {isSaved ? <Bookmark /> : <Bookmark />}
            </UserActions>
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
                        {likes?.length} Like
                        {likes?.length > 1 ? "s" : <></>}
                    </Likes>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <UserProfileName>{username}</UserProfileName>
                    <PostText>{rest.caption}</PostText>
                </View>
                {comments?.length !== 0 ? (
                    <>
                        <TotalComments>
                            View all {comments?.length} comments
                        </TotalComments>
                        {comments?.slice(0, 2).map((comment) => (
                            <TopComments key={comment.user_id}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        flex: 1,
                                    }}>
                                    <UserProfileName style={{ marginRight: 8 }}>
                                        {comment.username}
                                    </UserProfileName>
                                    <Text>{comment.comment}</Text>
                                </View>
                                <Ionicons name="heart-outline" size={16} />
                            </TopComments>
                        ))}
                    </>
                ) : (
                    <></>
                )}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 8,
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <Avatar
                            source={{
                                uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80",
                            }}
                            size="24"
                        />
                        {/* <UserCommentInput placeholder="Add a comment..."  /> */}
                        <Text
                            style={{
                                color: "#B3B3B3",
                            }}>
                            Add a comment...
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 12, marginRight: 10 }}>❤️</Text>

                        <Text style={{ fontSize: 12, marginRight: 10 }}>🙌 </Text>
                        <Text style={{ fontSize: 12 }}>➕</Text>
                    </View>
                </View>
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

const PostText = styled.Text`
    font-weight: 400;
    font-size: 15px;
    margin-left: 4px;
`;

const Likes = styled.Text`
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 4px;
`;

const TotalComments = styled.Text`
    color: #707070;
    margin: 6px 0px;
`;

const UserActions = styled.View`
    padding: 12px 8px;
    flex-direction: row;
    justify-content: space-between;
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
const PostHeader = styled.View`
    width: 100%;
    /* height: 48px; */
    flex-direction: row;
    padding: 12px 8px;
    justify-content: space-between;
    align-items: center;
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
