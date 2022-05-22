import { authFetchUserPosts } from "library/backend";
import { Dispatch } from "redux";
import { FeedActionType, FeedLoadingAction, FeedPostsStateChange } from "store/constants/feed-constants";

export const feedLoadingStarted = (): FeedLoadingAction => ({
    type: FeedActionType.FEED_LOADING_STARTED,
    payload: {
        isLoading: true
    }
})

export const feedLoadingEnded = (): FeedLoadingAction => ({
    type: FeedActionType.FEED_LOADING_ENDED,
    payload: {
        isLoading: false
    }
})

export const feedPostSuccess = (posts: any, uid: string): FeedPostsStateChange => ({
    type: FeedActionType.FEED_POSTS_STATE_CHANGE,
    payload: {
        posts: posts,
        usersFollowingLoaded: 0,
        uid: uid
    }
})

export const initializeFeed = (uid: string) => (dispatch: Dispatch) => {
    dispatch(feedLoadingStarted())
    return authFetchUserPosts().then(posts => {
        dispatch(feedPostSuccess(posts, uid))
    }).finally(() => {
        dispatch(feedLoadingEnded())
    })
}
