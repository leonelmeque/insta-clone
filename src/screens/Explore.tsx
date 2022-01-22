import React from 'react';
import styled from 'styled-components/native';
import { FlatList, View } from 'react-native';

const posts = [
  {
    id: '1',
    image: [
      {
        id: '1',
        image: '',
      },
    ],
  },
];

const Explore:React.FunctionComponent = ():JSX.Element => {
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => <View></View>}
      />
    </View>
  );
};

export default Explore;
