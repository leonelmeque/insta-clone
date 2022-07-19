import React from "react";
import { FunctionComponent } from "react";
import firebase from "firebase";
import Button from "components/atoms/Button";
import Box from "components/atoms/Box";
import { useUserActions } from "hooks/use-user-actions";
interface ProfileActionsProps {
    uid: string
}

const ProfileActions: FunctionComponent<ProfileActionsProps> = ({
    uid,
}) => {
    const {unfollowUser, followUser, follows } = useUserActions(uid)

    return (
        <Box
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "stretch",
            }}>
            {uid !== firebase.auth().currentUser?.uid && (
                <Button
                    onPress={() => {
                        if(follows) unfollowUser()
                        else followUser()
                    }}
                    style={{
                        flex: 1,
                    }}
                    variant="primary"
                    label={!follows ? "Follow" : "Following"}
                />
            )}
            <Box style={{ width: 8 }} />
            <Button
                onPress={() => {
                    // userFollowOrUnfollow();
                }}
                style={{
                    flex: 1,
                }}
                variant="secondary"
                label={"Message"}
            />
            <Box style={{ width: 8 }} />
            <Button
                onPress={() => {
                    // userFollowOrUnfollow();
                }}
                style={{
                    flex: 1,
                }}
                variant="secondary"
                label={"Email"}
            />
        </Box>
    );
};

export default ProfileActions;
