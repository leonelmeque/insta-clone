import { FunctionComponent } from "react";
import { connect, ConnectedProps } from "react-redux";
import { UserState } from "store/reducers/user";
import styled from "styled-components/native";
import { Image, Pressable, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
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
                            following={currentUserPosts?.length || 0}
                        />
                    </View>
                </ProfileHeader>
                <Box style={{
                    flexDirection:'row'
                }}>
                    {route?.params?.uid &&
                        route.params.uid !== firebase.auth().currentUser?.uid && (
                            <>
                                <Button
                                    onPress={() => {
                                        userFollowOrUnfollow();
                                    }}
                                    variant="primary"
                                    label={!follows ? "Follow" : "Following"}
                                />
                            </>
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
                    firebase.auth().signOut();
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
