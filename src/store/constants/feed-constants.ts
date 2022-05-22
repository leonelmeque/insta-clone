import { FeedState } from "store/types"


export enum FeedActionType {
    FEED_LOADING_STARTED = 'FEED_LOADING_STARTED',
    FEED_LOADING_ENDED = "FEED_LOADING_STARTED",
    FEED_STATE_CHANGE = "FEED_STATE_CHANGE",
    FEED_POSTS_STATE_CHANGE = "FEED_POSTS_STATE_CHANGE",
}

export type FeedStateChangeAction = {
    type: FeedActionType.FEED_STATE_CHANGE,
    payload: Pick<FeedState, 'users'>
}
export type FeedPostsStateChange = {
    type: FeedActionType.FEED_POSTS_STATE_CHANGE,
    payload: {
        posts: [],
        usersFollowingLoaded?: number,
        uid: string
    }
}

export type FeedLoadingAction = {
    type: FeedActionType.FEED_LOADING_ENDED | FeedActionType.FEED_LOADING_STARTED,
    payload: {
        isLoading: boolean
    }
}

