import { getUserProfileInfo } from "library/backend";
import { Dispatch } from "redux";
import { UserInfo } from "shared/types";
import { FetchProfileAction, UserProfileActions } from "store/constants/user-profile-constants";

export const fetchUserProfileStarted = (): FetchProfileAction => ({
    type: UserProfileActions.FETCH_PROFILE_STARTED
})

export const fetchUserProfileSuccess = (params: UserInfo): FetchProfileAction => ({
    type: UserProfileActions.FETCH_PROFILE_SUCCESS,
    payload: {
        ...params
    }
})

export const fetchUserProfileError = (error: string) => ({
    type: UserProfileActions.FETCH_PROFILE_ERROR,
    payload: {
        error
    }
})

export const asyncFetchUserProfile = (uid: string) => (dispatch: Dispatch) => {
    dispatch(fetchUserProfileStarted())
    return getUserProfileInfo(uid).then(resp => {
        dispatch(fetchUserProfileSuccess(resp as UserInfo))
    }).catch((e) => {
        dispatch(fetchUserProfileError(e.message))
    })
}