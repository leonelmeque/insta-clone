import { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { UserState } from '@redux/reducers/user';
import { fetchUserPosts } from '@redux/actions';
import styled from 'styled-components/native';
import { Image, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useEffect } from 'react';

type RootState = {
  userState: UserState;
};

const mapStateToProps = (store: RootState): UserState => ({
  user: store.userState.user,
  posts: store.userState.posts,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ProfileProps extends PropsFromRedux {}

const Post = (props: { uri: string }) => {
  const [isImageLoading, setIsImageLoading] =
    useState<boolean>(true);

  useEffect(() => {
    if (isImageLoading) {
      console.log('Loading image');
    } else {
      console.log('Done loading image');
    }

    return () => {
      console.log('Image component is unmounting');
    };
  });

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

const Profile: FunctionComponent<ProfileProps> = (
  props
) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledView>
        {/* <UserPostGallery> */}
        <Posts
          numColumns={3}
          horizontal={false}
          data={props.posts}
          renderItem={({ item, index }) => (
            <View style={{
              flex:1/3
            }}>
              <Post uri={item.downloadURL} />
            </View>
          )}
        />
        {/* </UserPostGallery> */}
      </StyledView>
    </SafeAreaView>
  );
};

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
