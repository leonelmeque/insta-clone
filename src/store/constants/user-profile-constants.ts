import { UserInfo } from "shared/types"


enum FetchProfileActions {
    FETCH_PROFILE_STARTED = "FETCH_PROFILE_STARTED",
    FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS",
    FETCH_PROFILE_ERROR = "FETCH_PROFILE_ERROR"
}

enum UpdateProfileActions {
    UPDATE_PROFILE_STARTED = "UPDATE_PROFILE_STARTED",
    UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS",
    UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR"
}

export const UserProfileActions = { ...FetchProfileActions, ...UpdateProfileActions }


export interface FetchProfileAction {
    type: keyof typeof FetchProfileActions
    payload?: UserInfo
}

export interface UpdateProfileAction {
    type: keyof typeof UpdateProfileActions
    payload?: Omit<UserInfo, 'id' | 'following' | 'followers'>
}