import { useFeed } from "context";
import { useFetchUser } from "hooks/use-fetch-user";
import { authFetchUserPosts } from "library/backend";
import { useEffect, useState } from "react";

export const useFetchFeed = (uid: string) => {
  const { feedState, feedDispatch } = useFeed()
  const { isLoading } = feedState

  // function initFeed() {
  //   props.feed.sort((x: any, y: any) => y.creation.toDate() - x.creation.toDate());
  //   setPosts(props.feed);
  // }

  useEffect(() => {
    authFetchUserPosts().then(results => {
      console.log(results)
      feedDispatch({
        type: 'FEED_POSTS_STATE_CHANGE',
        payload: {
          posts: results,
          usersFollowingLoaded: results.length
        }
      })
      // dispatch(feedPostSuccess(posts, uid))
    }).finally(() => {
      // dispatch(feedLoadingEnded())
      feedDispatch({
        type: 'FEED_LOADING_ENDED',
      })
    })

    // if (
    //   props.usersFollowingLoaded !== props.following?.length &&
    //   props.following?.length !== 0
    // ) {
    //   initFeed();
    // }

  });

  return {
    posts: feedState.feedPosts,
    isLoading
  }
}