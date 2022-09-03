import React, { useMemo } from 'react'
import { useFeed } from "context"
import { useFetchFeed } from "hooks/feed/use-fetch-feed"
import { ScrollView, View } from "react-native"
import UserPost from "./UserPost"
import Text from 'components/atoms/Text'

const Feed = () => {
  const { isLoading, } = useFetchFeed()
  const { feedState } = useFeed()
  const {feedPosts} = feedState

  const renderPosts = useMemo(() => {
    return Object.entries(feedPosts).map(([key, value]) => {
      return value.map((post, index) => <UserPost key={index.toString()} ownerID={key} post={post} />)
    })
  },[feedState])

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
      {renderPosts}
    </ScrollView>
  )
}

export default Feed