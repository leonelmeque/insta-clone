import { FunctionComponent } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { UserState } from "store/reducers/user-reducer";
import styled from "styled-components/native";
import { Pressable, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { StackParamsList } from "navigation/types";
import { useEffect } from "react";
import { getUser, fetchUserPosts, isFollowing } from "library/backend";
import UserAvatar from "components/molecules/Avatar/Avatar";
import ProfileStats from "components/molecules/Profile/ProfileStats";
import Box from "components/atoms/Box";
import ProfileActions from "components/molecules/Profile/ProfileActions";
import ProfileDescription from "components/molecules/Profile/ProfileDescription";
import ProfileGallery from "components/molecules/Profile/ProfileGallery";
import firebase from "firebase";
import { RootState } from "store/types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { asyncFetchUserProfile } from "store/actions/user-profile-actions";
import { useAuth } from "hooks";

const mapStateToProps = (state: RootState) => {
    const { userInfo, user } = state;
    return {
        ...userInfo,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    return {
        fetchUserProfile: (uid: string) => dispatch(asyncFetchUserProfile(uid)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ProfileProps extends PropsFromRedux {
    uid?: string;
}

const Profile: FunctionComponent<
    NativeStackScreenProps<StackParamsList, "tabs/profile"> & ProfileProps
> = ({
    fetchUserProfile,
    id,
    description,
    following,
    followers,
    userProfilePicture,
    userType,
    isPrivate,
    uid,
    navigation,
    route,
}) => {
    const [currentUserPosts, setCurrentUserPosts] = useState<object[] | undefined>();
    const [currentUser, setCurrentUser] = useState<{ username?: string } | undefined>();
    const {onLogOut} = useAuth()

    // Fetching user profile
    const fetchProfile = async () => {
        const [userResult, postsResult, followingResult] = await Promise.all([
            getUser(route.params.uid),
            fetchUserPosts(route?.params?.uid),
            isFollowing(route?.params?.uid),
        ]);

        // Initializing states
        setCurrentUser(userResult as { username: string });
        setCurrentUserPosts(postsResult);
    };

    useEffect(() => {
        console.log(`User profile with uid ${uid}, user profile with id ${id}`)
        fetchUserProfile((uid as string) || (id as string));
    }, []);

    return (
        <StyledView>
            <Box>
                <Box
                    style={{
                        paddingHorizontal: 16,
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>
                    <UserAvatar
                        size={74}
                        style={{ margin: 0 }}
                        source={{
                            uri: userProfilePicture,
                        }}
                    />
                    <Box style={{ flex: 1 }}>
                        <ProfileStats
                            posts={currentUserPosts?.length || 0}
                            followers={followers?.length || 0}
                            following={following?.length || 0}
                        />
                    </Box>
                </Box>
                <ProfileDescription
                    username={currentUser?.username as string}
                profileType={userType as string}
                    description={description as string}
                />
                <ProfileActions route={route} navigation={navigation} />
            </Box>

            <ProfileGallery posts={currentUserPosts as []} />

            {/* </UserPostGallery> */}
            <StyledButton
                onPress={() => {
                    onLogOut()
                    navigation.navigate("landing/home", {});
                }}>
                <StyledButtonText>Sign out</StyledButtonText>
            </StyledButton>
        </StyledView>
    );
};

const StyledButton = styled(Pressable)`
    padding: 14px;
    width: 100%;
    text-align: center;
    background: #4095ce;
    border-radius: 2px;
`;

const StyledButtonText = styled(Text)`
    text-align: center;
    color: white;
    font-size: 12px;
    font-weight: bold;
`;

const StyledView = styled(ScrollView)`
    flex: 1;
    background-color: white;
`;

export default connector(Profile);
