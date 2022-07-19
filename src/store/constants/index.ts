//User action types

import { UserState } from "store/reducers/user-reducer";
import { FeedState } from "store/types";


export enum UserActionType {
    USER_STATE_CHANGE = "USER_STATE_CHANGE",
    USER_LIKES_STATE_CHANGE = "USER_LIKES_STATE_CHANGE",
    REMOVE_USER_FROM_STATE = "REMOVE_USER_FROM_STATE",
    USER_POSTS_STATE_CHANGE = "USER_POSTS_STATE_CHANGE",
    USER_FOLLOWING_STATE_CHANGE = "USER_FOLLOWING_STATE_CHANGE",
    CLEAR_DATA = "CLEAR_DATA"
}

export interface UserStateChangeAction {
    type: UserActionType.USER_STATE_CHANGE,
    payload: Pick<UserState, 'user'>
}

export interface UserLikesStateChange {
    type: UserActionType.USER_LIKES_STATE_CHANGE,
    payload: {
        currentUserLike: boolean,
        postId: string,
        uid: string
    }
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




