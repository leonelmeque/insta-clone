import { FunctionComponent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { UserState } from "store/reducers/user";
import styled from "styled-components/native";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { StackParamsList } from "navigation/types";
import { useEffect } from "react";
import {
    getUser,
    fetchUserPosts,
    followUser,
    unFollowUser,
    isFollowing,
} from "library/backend";
import firebase from "firebase";
import UserAvatar from "components/molecules/Avatar/Avatar";
import ProfileStats from "components/molecules/Profile/ProfileStats";
import Button from "components/atoms/Button";
import Box from "components/atoms/Box";
import ProfileActions from "components/molecules/Profile/ProfileActions";
import ProfileDescription from "components/molecules/Profile/ProfileDescription";
import ProfileGallery from "components/molecules/Profile/ProfileGallery";

type RootState = {
    userState: UserState;
};

const mapStateToProps = (store: RootState): UserState => ({
    user: store.userState.user,
    posts: store.userState.posts,
    following: store.userState.following,
    feed: [],
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ProfileProps extends PropsFromRedux {}

const Post = (props: { uri: string }) => {
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

    return (
        <Box
            style={{
                width: Dimensions.get("screen").width / 3,
                maxHeight: Dimensions.get("screen").width / 3,
            }}>
            {isImageLoading && (
                <View style={{ flex: 1 }}>
                    <Text>Loading Image Content</Text>
                </View>
            )}
            <StyledPost
                source={{ uri: props.uri }}
                onLoad={() => {
                    setIsImageLoading(false);
                }}
                onError={() => console.log("error loading asset")}
            />
        </Box>
    );
};

const Profile: FunctionComponent<
    NativeStackScreenProps<StackParamsList, "Profile"> & ProfileProps
> = ({ user, posts, following, navigation, route }) => {
    const [currentUserPosts, setCurrentUserPosts] = useState<object[] | undefined>();
    const [currentUser, setCurrentUser] = useState<{ username?: string } | undefined>();

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
        if (route?.params?.uid) {
            if (!currentUser) fetchProfile();

            return;
        }

        setCurrentUser(user as object);
        setCurrentUserPosts(posts);
        return () => {};
    }, []);

    return (
        <StyledView>
            <View>
                <ProfileHeader>
                    <UserAvatar
                        size={84}
                        style={{ margin: 0 }}
                        source={{
                            uri: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
                        }}
                    />
                    <View style={{ flex: 1 }}>
                        <ProfileStats
                            posts={currentUserPosts?.length || 0}
                            followers={currentUserPosts?.length || 0}
                            following={following?.length || 0}
                        />
                    </View>
                </ProfileHeader>
                <ProfileDescription
                    username={currentUser?.username as string}
                    profileType={"Unknow Profile Type"}
                    description="Some type of description that we will add later"
                />
                <ProfileActions route={route} navigation={navigation} />
            </View>

            <ProfileGallery posts={currentUserPosts as []} />

            {/* </UserPostGallery> */}
            {/* <StyledButton
                onPress={() => {
                    console.log("sign out complete");
                    firebase.auth().signOut();
                    navigation.navigate("Landing");
                }}>
                <StyledButtonText>Sign out</StyledButtonText>
            </StyledButton> */}
        </StyledView>
    );
};

const ProfileHeader = styled(View)`
    flex-direction: row;
`;

const ProfileStatusLabel = styled(Text)`
    text-align: center;
    font-size: 12px;
    font-weight: bold;
`;

const ProfileStatusNumbers = styled(Text)`
    text-align: center;
    font-size: 16px;
    font-weight: 600;
`;

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

const UserProfileContainer = styled(View)``;

const UserPostGallery = styled(View)`
    flex: 1;
`;

const StyledPost = styled(Image)`
    flex: 1;
    aspect-ratio: 1;
`;

const Posts = styled(FlatList)``;

export default connector(Profile);
