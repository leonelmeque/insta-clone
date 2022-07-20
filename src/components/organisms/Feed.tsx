import React from 'react'
import { useFeed, useUser } from "context"
import { useFetchFeed } from "hooks/feed/use-fetch-feed"
import { ScrollView, View } from "react-native"
import UserPost from "./UserPost"
import Text from 'components/atoms/Text'

const Feed = () => {
  const [userState] = useUser()
  const { isLoading } = useFetchFeed(userState.user.uid)
  const { feedState } = useFeed()

  if (isLoading) {
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
      {feedState.feedPosts.map(({id, ...rest}: any) => (
        <UserPost key={id} {...rest} />
      ))}
    </ScrollView>
  )
}

export default Feed