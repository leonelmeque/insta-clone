//User action types

import { UserState } from "redux/reducers/user";


export enum UserActionType {
    USER_STATE_CHANGE = "USER_STATE_CHANGE",
    REMOVE_USER_FROM_STATE = "REMOVE_USER_FROM_STATE",
    USER_POSTS_STATE_CHANGE = "USER_POSTS_STATE_CHANGE"
}

export interface UserStateChangeAction {
    type: UserActionType.USER_STATE_CHANGE,
    payload: UserState
}

export interface RemoveUserFromState {
    type: UserActionType.REMOVE_USER_FROM_STATE;
    payload: UserState
}

export interface UserPostsStateChange {
    type: UserActionType.USER_POSTS_STATE_CHANGE,
    payload: UserState
}