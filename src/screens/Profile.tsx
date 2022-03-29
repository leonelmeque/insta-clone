import { FunctionComponent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { UserState } from "@redux/reducers/user";
import styled from "styled-components/native";
import { Image, Pressable, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";
import { StackParamsList } from "@navigation/types";
import { useEffect } from "react";
import {
    getUser,
    fetchUserPosts,
    followUser,
    unFollowUser,
    isFollowing,
} from "@library/backend";
import firebase from "firebase";
import { Avatar } from "@components/Avatar";

type RootState = {
    userState: UserState;
};

const mapStateToProps = (store: RootState): UserState => ({
    user: store.userState.user,
    posts: store.userState.posts,
    following: store.userState.following,
    feed:[]
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ProfileProps extends PropsFromRedux {}

const Post = (props: { uri: string }) => {
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

    return (
        <View style={{ flex: 1 }}>
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
        </View>
    );
};

const Profile: FunctionComponent<
    NativeStackScreenProps<StackParamsList, "Profile"> & ProfileProps
> = ({ user, posts, following, navigation, route }) => {
    const [currentUserPosts, setCurrentUserPosts] = useState<object[] | undefined>();
    const [currentUser, setCurrentUser] = useState<{ username?: string } | undefined>();
    const [follows, setFollows] = useState<boolean | null>(null);

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
        setFollows(followingResult);
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
                    <Avatar
                        size="84"
                        source={{
                            uri: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
                        }}
                    />
                    <View style={{ flex: 1 }}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                backgroundColor: "blue",
                            }}>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <ProfileStatusNumbers>
                                    {currentUserPosts?.length}
                                </ProfileStatusNumbers>
                                <ProfileStatusLabel> Posts </ProfileStatusLabel>
                            </View>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <ProfileStatusNumbers>
                                    {currentUserPosts?.length}
                                </ProfileStatusNumbers>
                                <ProfileStatusLabel> Following </ProfileStatusLabel>
                            </View>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <ProfileStatusNumbers>{0}</ProfileStatusNumbers>
                                <ProfileStatusLabel> Followers </ProfileStatusLabel>
                            </View>
                        </View>
                        <View>
                            {route?.params?.uid &&
                                route.params.uid !== firebase.auth().currentUser?.uid && (
                                    <>
                                        {!follows ? (
                                            <StyledButton
                                                onPress={() => {
                                                    followUser(route?.params?.uid).then(
                                                        () => {
                                                            setFollows(!follows);
                                                        }
                                                    );
                                                }}>
                                                <StyledButtonText
                                                    style={{ color: "white" }}>
                                                    <>Follow</>
                                                </StyledButtonText>
                                            </StyledButton>
                                        ) : (
                                            <StyledButton
                                                onPress={() => {
                                                    unFollowUser(route?.params?.uid).then(
                                                        () => {
                                                            setFollows(!follows);
                                                        }
                                                    );
                                                }}>
                                                <StyledButtonText>
                                                    Following
                                                </StyledButtonText>
                                            </StyledButton>
                                        )}
                                    </>
                                )}
                        </View>
                    </View>
                </ProfileHeader>
                <Text>{currentUser?.username}</Text>
            </View>
            {/* <UserPostGallery> */}
            <Posts
                numColumns={3}
                horizontal={false}
                data={currentUserPosts}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flex: 1 / 3,
                        }}>
                        <Post uri={item.downloadURL} />
                    </View>
                )}
            />
            {/* </UserPostGallery> */}
            <StyledButton
                onPress={() => {
                    console.log("sign out complete");
                    firebase.auth().signOut()
                    navigation.navigate("Landing");
                }}>
                <StyledButtonText>Sign out</StyledButtonText>
            </StyledButton>
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

const StyledView = styled(View)`
    flex: 1;
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
