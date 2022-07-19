import React from 'react'
import { useUser } from "context"
import { useFetchFeed } from "hooks/feed/use-fetch-feed"
import { ScrollView, View } from "react-native"
import UserPost from "./UserPost"
import Text from 'components/atoms/Text'

const Feed = () => {
  const [userState] = useUser()
  const {posts, isLoading} = useFetchFeed(userState.user.uid)
  if(isLoading){
    return (
      <View>
        <Text variant='body'>
        Feed is Loading
        </Text>
      </View>
    )
  }
  return (
    <ScrollView>
      {posts.map((item: any) => (
        <UserPost key={item.id} {...item} />
      ))}
    </ScrollView>
  )
}

export default Feed