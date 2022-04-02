import { Avatar } from "components/Avatar";
import { Ionicons } from "@expo/vector-icons";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

interface PostCommentsProps {
    [key:string]: any
}

const PostComments: FunctionComponent<PostCommentsProps> = (props) => {
    return (
        <>
            {props.comments?.length !== 0 ? (
                <>
                    <TotalComments>View all {props.comments?.length} comments</TotalComments>
                    {props.comments?.slice(0, 2).map((comment:any) => (
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
        </>
    );
};

const TotalComments = styled.Text`
    color: #707070;
    margin: 6px 0px;
`;

const TopComments = styled.View`
    flex-direction: row;
    padding: 4px 0px;
`;

const UserProfileName = styled.Text`
    font-weight: 600;
    font-size: 14px;
`;


export default PostComments;
