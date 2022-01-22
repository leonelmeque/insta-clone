import { HomeAppBar } from '@components/AppBar';
import FeedPost from '@components/FeedPost';
import Stories from '@components/Stories';
import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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

export default function HomeScreen():JSX.Element {
  return (
    <SafeAreaView>
      <HomeAppBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stories />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <FeedPost {...item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
