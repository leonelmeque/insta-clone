import React from "react";
import { FunctionComponent } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StackParamsList } from "navigation/types";
import { useEffect } from "react";
import {
    followUser,
    unFollowUser,
    isFollowing,
} from "library/backend";
import firebase from "firebase";
import Button from "components/atoms/Button";
import Box from "components/atoms/Box";

interface ProfileActionsProps
    extends NativeStackScreenProps<StackParamsList, "Profile"> {}

const ProfileActions: FunctionComponent<ProfileActionsProps> = ({
    route,
    navigation,
}) => {
    const [follows, setFollows] = useState<boolean | null>(null);

    // Fetching user profile
    const fetchFollowStatus = async () => {
        const result = await isFollowing(route?.params?.uid);
        setFollows(result);
    };

    const userFollowOrUnfollow = () => {
        if (!follows) {
            followUser(route?.params?.uid).then(() => {
                setFollows(!follows);
            });
        } else {
            unFollowUser(route?.params?.uid).then(() => {
                setFollows(!follows);
            });
        }
    };

    useEffect(() => {
        if (route?.params?.uid) {
            if (!follows) fetchFollowStatus();
            return;
        }
    }, []);

    return (
        <Box
            style={{
                flexDirection: "row",
            }}>
            {route?.params?.uid && route.params.uid !== firebase.auth().currentUser?.uid && (
                <Button
                    onPress={() => {
                        userFollowOrUnfollow();
                    }}
                    variant="primary"
                    label={!follows ? "Follow" : "Following"}
                />
            )}

            <Button
                onPress={() => {
                    // userFollowOrUnfollow();
                }}
                variant="secondary"
                label={"Message"}
            />
            <Button
                onPress={() => {
                    // userFollowOrUnfollow();
                }}
                variant="secondary"
                label={"Email"}
            />
        </Box>
    );
};

export default ProfileActions;
