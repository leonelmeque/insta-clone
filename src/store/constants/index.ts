//User action types

import { UserState } from "store/reducers/user";


export enum UserActionType {
    USER_STATE_CHANGE = "USER_STATE_CHANGE",
    REMOVE_USER_FROM_STATE = "REMOVE_USER_FROM_STATE",
    USER_POSTS_STATE_CHANGE = "USER_POSTS_STATE_CHANGE",
    USER_FOLLOWING_STATE_CHANGE = "USER_FOLLOWING_STATE_CHANGE",
    CLEAR_DATA = "CLEAR_DATA"
}

export interface UserStateChangeAction {
    type: UserActionType.USER_STATE_CHANGE,
    payload: Pick<UserState, 'user'>
}

export interface RemoveUserFromState {
    type: UserActionType.REMOVE_USER_FROM_STATE;
    payload: Pick<UserState, 'user'>
}

export interface UserPostsStateChange {
    type: UserActionType.USER_POSTS_STATE_CHANGE,
    payload: Pick<UserState, 'posts'>
}
export interface UserFollowingStateChange {
    type: UserActionType.USER_FOLLOWING_STATE_CHANGE,
    payload: Pick<UserState, 'following'>
}

export interface RemoveUserData {
    type : UserActionType.CLEAR_DATA,
    payload: {}
}

//Feed action types

import { FeedState } from "store/reducers/feed";


export enum FeedActionType {
    FEED_STATE_CHANGE = "FEED_STATE_CHANGE",
    FEED_POSTS_STATE_CHANGE = "FEED_POSTS_STATE_CHANGE",
    // FEED_FOLLOWING_STATE_CHANGE = "FEED_FOLLOWING_STATE_CHANGE"
}

export interface FeedStateChangeAction {
    type: FeedActionType.FEED_STATE_CHANGE,
    payload: Pick<FeedState, 'users'>
}
export interface FeedPostsStateChange {
    type: FeedActionType.FEED_POSTS_STATE_CHANGE,
    payload: {
        posts: [],
        usersFollowingLoaded?: number,
        uid: string
    }
}
