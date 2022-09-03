import { useFeed, useUser } from "context";
import { authFetchUserPosts, fetchUserPosts } from "library/backend";
import { PostProps } from "library/types";
import { useEffect } from "react";

export const useFetchFeed = () => {
  const { feedState, feedDispatch } = useFeed()
  const [userState, _] = useUser()
  const { isLoading } = feedState

  const dispatchUpdateFeed = (posts: PostProps[], key:string) => {
    feedDispatch({
      type: 'FEED_POSTS_STATE_CHANGE',
      payload: {
        key: key,
        posts: posts,
        usersFollowingLoaded: 0
      }
    })
  }

  const fetchLoggedUserPosts = async () => {
    const userPosts = await authFetchUserPosts() as PostProps[]
    dispatchUpdateFeed(userPosts, userState.user?.uid as string)
  }

  const fetchUserFollowingPosts = async () => {
    userState.following?.forEach(async (uid) => {
      const result = await fetchUserPosts(uid) as PostProps[]
      dispatchUpdateFeed(result, uid)
    })
  }

  useEffect(() => {
    fetchLoggedUserPosts().then(() => {
      return fetchUserFollowingPosts()
    }).then(() => {
      feedDispatch({
        type: 'FEED_LOADING_ENDED',
      })
    })

    return () => {
      console.log("cleaning up")
    }
  },[]);

  return {
    isLoading
  }
}