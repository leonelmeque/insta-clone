import React from 'react'
import { useFeed, useUser } from "context"
import { useFetchFeed } from "hooks/feed/use-fetch-feed"
import { ScrollView, View } from "react-native"
import UserPost from "./UserPost"
import Text from 'components/atoms/Text'
import { FeedPost } from 'library/types'

const Feed = () => {
  const { isLoading, } = useFetchFeed()
  const { feedState } = useFeed()


  const renderPosts = () => {
    const { feedPosts } = feedState
    return Object.entries(feedPosts).map(([key, value]) => {
     
      return value.map((post, index) => <UserPost key={index.toString()} ownerID={key} post={post} />)
    })
  }

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
      {renderPosts()}
    </ScrollView>
  )
}

export default Feed