import { Avatar } from "components/Avatar";
import { Ionicons } from "@expo/vector-icons";
import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import Box from "components/atoms/Box";
import Text from "components/atoms/Text";

interface PostCommentsProps {
    [key: string]: any;
}

const PostComments: FunctionComponent<PostCommentsProps> = (props) => {
    return (
        <Box padding="s">
            {props.comments?.length !== 0 ? (
                <>
                    <Text variant="body" style={style.totalComments}>
                        View all {props.comments?.length} comments
                    </Text>
                    {props.comments?.slice(0, 2).map((comment: any, index: number) => (
                        <Box style={style.topComments} key={comment.user_id || index}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                }}>
                                <Text
                                    variant="body"
                                    style={{ marginRight: 8, ...style.username }}>
                                    {comment.username}
                                </Text>
                                <Text variant="body">{comment.comment}</Text>
                            </View>
                            <Ionicons name="heart-outline" size={16} />
                        </Box>
                    ))}
                </>
            ) : (
                <></>
            )}
            <Box
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                }}>
                <Box
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
                    <Text
                        variant="body"
                        style={{
                            color: "#B3B3B3",
                        }}>
                        Add a comment...
                    </Text>
                </Box>
                <Box style={{ flexDirection: "row" }}>
                    <Text variant="body" style={{ fontSize: 12, marginRight: 10 }}>
                        ❤️
                    </Text>

                    <Text variant="body" style={{ fontSize: 12, marginRight: 10 }}>
                        🙌{" "}
                    </Text>
                    <Text variant="body" style={{ fontSize: 12 }}>
                        ➕
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

const style = StyleSheet.create({
    totalComments: {
        color: "#707070",
        marginVertical: 6,
        marginHorizontal: 0,
    },
    topComments: {
        flexDirection: "row",
        paddingVertical: 4,
    },
    username: {
        fontWeight: "600",
        fontSize: 14,
    },
});

export default PostComments;
