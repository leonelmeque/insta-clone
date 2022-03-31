import { FeedActionType, FeedPostsStateChange, FeedStateChangeAction } from "store/constants"
export interface FeedState {
    users: any,
    usersFollowingLoaded: number;
    feed: []
}

const initState: FeedState = {
    users: [],
    usersFollowingLoaded: 0,
    feed: []
}

type Action = FeedPostsStateChange | FeedStateChangeAction

export default function feedReducer(state = initState, action: Action): FeedState {
    switch (action.type) {
        case FeedActionType.FEED_STATE_CHANGE: return {
            ...state,
            users: [...state.users as [], action.payload.users] as any
        }
        case FeedActionType.FEED_POSTS_STATE_CHANGE: return {
            ...state,
            usersFollowingLoaded: action?.payload?.usersFollowingLoaded || 0 + 1,
            feed: [...state.feed, ...action.payload.posts],
        }
        default: return state
    }
}