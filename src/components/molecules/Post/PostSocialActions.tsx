import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import {
    Bookmark,
    Comment,
    Heart,
    HeartRed,
    Share,
} from "components/atoms/Icons/react-icons";
import Box from "components/atoms/Box";

interface PostSocialActionsProps {
    [key: string]: any;
}
// This is a Stateful component
const PostSocialActions: FunctionComponent<PostSocialActionsProps> = (props) => {
    return (
        <Box style={styles.container}>
            <Box style={styles.socialActions}>
                {props.hasLike ? <HeartRed /> : <Heart />}
                <Comment />
                <Share />
            </Box>
            {props.isBookmarked ? <Bookmark /> : <Bookmark />}
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    socialActions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 110,
        flex: 1,
    },
});

export default PostSocialActions;
