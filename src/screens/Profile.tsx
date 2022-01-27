import { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { UserState } from '@redux/reducers/user';
import styled from 'styled-components/native';
import { Image, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useState } from 'react';
import { StackParamsList } from '@navigation/types';
import { useEffect } from 'react';
import { getUser } from '@library/api';
import {
  fetchUserPosts,
  followUser,
  unFollowUser,
  isFollowing,
} from '@library/api';
import firebase from 'firebase'

type RootState = {
  userState: UserState;
};

const mapStateToProps = (store: RootState): UserState => ({
  user: store.userState.user,
  posts: store.userState.posts,
  following: store.userState.following
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ProfileProps extends PropsFromRedux {}

const Post = (props: { uri: string }) => {
  const [isImageLoading, setIsImageLoading] =
    useState<boolean>(true);

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
        onError={() => console.log('error loading asset')}
      />
    </View>
  );
};

const Profile: FunctionComponent<
  NativeStackScreenProps<StackParamsList, 'Profile'> &
    ProfileProps
> = ({ user, posts,following, navigation, route }) => {
  const [currentUserPosts, setCurrentUserPosts] = useState<
    object[] | undefined
  >();

  const [currentUser, setCurrentUser] = useState<
    { username?: string } | undefined
  >();

  const [follows, setFollows] = useState<boolean>();

  const fetchProfile = async () => {
    const [userResult, postsResult, followingResult] =
      await Promise.all([
        getUser(route.params.uid),
        fetchUserPosts(route?.params?.uid),
        isFollowing(route?.params?.uid),
      ]);

    setCurrentUser(userResult as { username: string });
    setCurrentUserPosts(postsResult);
    setFollows(followingResult);
  };

  useEffect(() => {
    if (route?.params?.uid) {
      if (!currentUser) {
        fetchProfile();
      }
      return;
    }

    setCurrentUser(user as object);
    setCurrentUserPosts(posts);
    return () => {
      console.log('unmounting');
    };
  },[]);

  return (
    <StyledView>
      <View>
        <Text>{currentUser?.username}</Text>
        <Text>Following {following?.length}</Text>
        <Text>Followers {0}</Text>
        {route?.params?.uid &&
          route.params.uid !==
            firebase.auth().currentUser?.uid && (
            <>
              {!follows ? (
                <StyledButton
                  onPress={() => {
                    followUser(route?.params?.uid).then(()=>{
                      setFollows(!follows)
                    })
                  }}>
                  <StyledButtonText
                    style={{ color: 'white' }}>
                    Follow
                  </StyledButtonText>
                </StyledButton>
              ) : (
                <StyledButton
                  onPress={() => {
                    unFollowUser(route?.params?.uid).then(()=>{
                      setFollows(!follows)
                    });
                  }}>
                  <StyledButtonText>
                    unfollow
                  </StyledButtonText>
                </StyledButton>
              )}
            </>
          )}
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
