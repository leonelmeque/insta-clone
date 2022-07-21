import { useFeed, useUser } from "context";
import { authFetchUserPosts, fetchUserPosts } from "library/backend";
import { useEffect } from "react";

export const useFetchFeed = () => {
  const { feedState, feedDispatch } = useFeed()
  const [userState, _] = useUser()
  const { isLoading } = feedState

  // function initFeed() {
  //   props.feed.sort((x: any, y: any) => y.creation.toDate() - x.creation.toDate());
  //   setPosts(props.feed);
  // }

  const fetchLoggedUserPosts = async () => {
    const userPosts = await authFetchUserPosts()
    feedDispatch({
      type: 'FEED_POSTS_STATE_CHANGE',
      payload: {
        posts: userPosts,
        usersFollowingLoaded: 0
      }
    })
  }

  const fetchUserFollowingPosts = async () => {
    userState.following?.forEach(async (uid) => {
      const result = await fetchUserPosts(uid)
    })
  }

  useEffect(() => {
    fetchUserFollowingPosts()
    fetchLoggedUserPosts().then(() => {
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

  }, []);

  return {
    isLoading
  }
}