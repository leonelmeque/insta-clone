import { HomeAppBar } from '@components/AppBar';
import FeedPost from '@components/InstaPost';
import Stories from '@components/Stories';
import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect, ConnectedProps } from 'react-redux';
import {
  AnyAction,
  bindActionCreators,
  Dispatch,
} from 'redux';
import { fetchUser, fetchUserPosts,fetchUserFollowing } from '@redux/actions';
import { AnyActionTypeWithPayload } from '@shared/types';
import { UserState } from '@redux/reducers/user';
import { useEffect } from 'react';

const posts = [
  {
    id: '1',
    username: '_natashaGred',
    isLiked: true,
    comments: [
      {
        user_id: '1',
        comment: 'Good one',
        username: 'jhondoe',
      },
      {
        user_id: '2',
        comment: 'Love it',
        username: 'janedoe',
      },
      {
        user_id: '3',
        comment: 'Amazing',
        username: 'motiondesigner',
      },
    ],
    isSaved: false,
    postDate: '12/12/2021',
    likes: [
      {
        user_id: '1',
        username: 'jhondoe',
      },
      {
        user_id: '2',
        username: 'janedoe',
      },
      ,
      {
        user_id: '3',
        username: 'motiondesigner',
      },
      {
        user_id: '4',
        username: 'theuiblog',
      },
    ],
  },
  {
    id: '2',
    username: '_natashaGred',
    isLiked: false,
    comments: [],
    isSaved: true,
    postDate: '12/12/2021',
    likes: [
      {
        user_id: '1',
        username: 'jhondoe',
      },
    ],
  },
];
type RootState = {
  userState: UserState<any>;
};

const mapStateToProps = (store: RootState) => ({
  user: store.userState.user,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { fetchUser, fetchUserPosts, fetchUserFollowing },
    dispatch
  );

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

function FeedScreen(props: Props): JSX.Element {
  useEffect(() => {
    if (!props.user) {
      props.fetchUser();
      props.fetchUserPosts();
      props.fetchUserFollowing();
      return;
    }
    // console.log('current user is ', props);
  });
  return (
    <SafeAreaView>
      <HomeAppBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stories />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <FeedPost {...item} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default connector(FeedScreen);
