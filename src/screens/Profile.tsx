import React from "react";
import styled from "styled-components/native";
import { Pressable, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import UserAvatar from "components/molecules/Avatar/Avatar";
import ProfileStats from "components/molecules/Profile/ProfileStats";
import Box from "components/atoms/Box";
import ProfileActions from "components/molecules/Profile/ProfileActions";
import ProfileDescription from "components/molecules/Profile/ProfileDescription";
import ProfileGallery from "components/molecules/Profile/ProfileGallery";
import { useAuth, useFetchUser, usefetchUserPosts } from "hooks";
import { useNavigation, useRoute } from "@react-navigation/native";


const Profile = () => {
    const route = useRoute()
    const navigation = useNavigation()
    
    //  @ts-ignore
    const _currentUser = useFetchUser(route?.params?.uid as string)
    //  @ts-ignore
    const userPosts = usefetchUserPosts(route?.params?.uid as string)

    const { onLogOut } = useAuth()
    console.log(_currentUser)
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
                            uri: _currentUser?.userProfilePicture,
                        }}
                    />
                    <Box style={{ flex: 1 }}>
                        <ProfileStats
                            posts={userPosts?.length || 0}
                            followers={_currentUser?.followers?.length || 0}
                            following={_currentUser?.following?.length || 0}
                        />
                    </Box>
                </Box>
                <ProfileDescription
                    username={_currentUser?.username as string}
                    profileType={_currentUser?.userType as string}
                    description={_currentUser?.description as string}
                />
                <ProfileActions uid={_currentUser?.uid as string} />
            </Box>
            <ProfileGallery posts={userPosts as []} />
            <StyledButton
                onPress={() => {
                    onLogOut()
                    //  @ts-ignore
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

export default Profile;
