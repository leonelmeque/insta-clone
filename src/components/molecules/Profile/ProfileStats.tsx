import Box from "components/atoms/Box";
import Text from "components/atoms/Text";
import React, { FunctionComponent } from "react";
import { StyleSheet } from "react-native";

interface ProfileStatsProps {
    posts: number;
    followers: number;
    following: number;
}

const ProfileStats: FunctionComponent<ProfileStatsProps> = (props) => {
    return (
        <Box style={style.container}>
            <Box style={[style.statsWrapper]}>
                <Text style={{ textAlign: "center" }} variant="body" color="textDark">
                    {props.posts}
                </Text>
                <Text style={{ color: "#8e8e8e" }} variant="body" color="textDark">
                    Posts
                </Text>
            </Box>
            <Box style={[style.statsWrapper]}>
                <Text style={{ textAlign: "center" }} variant="body" color="textDark">
                    {props.following}
                </Text>
                <Text
                    style={{ textAlign: "center", color: "#8e8e8e" }}
                    variant="body"
                    color="textDark">
                    Following
                </Text>
            </Box>
            <Box style={[style.statsWrapper]}>
                <Text style={{ textAlign: "center" }} variant="body" color="textDark">
                    {props.followers}
                </Text>
                <Text
                    style={{ textAlign: "center", color: "#8e8e8e" }}
                    variant="body"
                    color="textDark">
                    Followers
                </Text>
            </Box>
        </Box>
    );
};

const style = StyleSheet.create({
    container: {
        paddingTop: 32,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    statsWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default ProfileStats;
