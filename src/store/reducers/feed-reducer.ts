import { FeedActionType, FeedLoadingAction, FeedPostsStateChange, FeedStateChangeAction } from "store/constants/feed-constants"
import { FeedState } from "store/types"

const initState: FeedState = {
    users: [],
    usersFollowingLoaded: 0,
    feedPosts: [],
    isLoading: false
}

type Action = FeedPostsStateChange | FeedStateChangeAction | FeedLoadingAction

export default function feedReducer(state = initState, action: Action): FeedState {
    const { type, payload } = action

    switch (type) {
        case FeedActionType.FEED_LOADING_STARTED : return {
            ...state,
            isLoading: true
        }
        case FeedActionType.FEED_LOADING_ENDED : return {
            ...state, 
            isLoading: false
        }
        case FeedActionType.FEED_STATE_CHANGE: return {
            ...state,
            users: [...state.users as [], payload.users] as any
        }
        case FeedActionType.FEED_POSTS_STATE_CHANGE: return {
            ...state,
            usersFollowingLoaded: action?.payload?.usersFollowingLoaded || 0 + 1,
            feedPosts: [...state.feedPosts, ...payload.posts],
        }
        default: return state
    }
}