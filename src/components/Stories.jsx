import { Avatar } from '@components/Avatar';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';

const stories = [
  {
    id: '1',
    username: '_natashaGreg',
    avatarImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80',
  },
  {
    id: '2',
    username: '_natashaGreg',
    avatarImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80',
  },
  {
    id: '3',
    username: '_natashaGreg',
    avatarImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80',
  },
  {
    id: '4',
    username: '_natashaGreg',
    avatarImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80',
  },
];

const Stories = () => {
  return (
    <FlatList
      ItemSeparatorComponent={() => (
        <View style={{ marginRight: 12 }} />
      )}
      keyExtractor={(item) => item.id}
      style={{
        backgroundColor: '#ECEBEB',
        borderBottomWidth: 1,
        borderColor: '#D6D6D6',
        paddingHorizontal: 16,
        paddingVertical: 14,
      }}
      data={stories}
      horizontal
      renderItem={({ item, index }) => (
        <Story onPress={() => alert('Viewing story')}>
          <View>
            <Avatar
              size={64}
              source={{
                uri: item.avatarImage,
              }}
            />
            {index === 0 && (
              <AddStoryButton>
                <Ionicons
                  name='add'
                  size={24}
                  color='#fff'
                />
              </AddStoryButton>
            )}
          </View>
          <UserStoryName>{item.username.substring(0,16)}{item.username.length>16 && <>...</> }</UserStoryName>
        </Story>
      )}
    />
  );
};

const Story = styled.Pressable`
  justify-content: center;
  align-items: center;
`;

const UserStoryName = styled.Text`
  margin-top: 4px;
  font-size: 12px;
  text-align: center;
`;

const AddStoryButton = styled.View`
  background-color: #0094f6;
  position: absolute;
  border-width: 1.5;
  border-color: #fff;
  border-radius: 25;
  width: 26;
  height: 26;
  justify-content: center;
  align-items: center;
  bottom: -4;
  right: 0;
  overflow: hidden;
`;

export default Stories;
