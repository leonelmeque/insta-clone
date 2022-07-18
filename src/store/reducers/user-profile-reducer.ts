import { AnyAction } from "redux"
import { UserProfileActions } from "store/constants/user-profile-constants"
import { ProfileReducerProps } from "store/types"


const initState: ProfileReducerProps = {
    userType: "default",
    description: undefined,
    followers: [],
    following: [],
    userProfilePicture: undefined,
    isPrivate: false,
    isLoading: false,
    error: undefined
}


export default function userProfileReducer(state = initState, action: AnyAction) {
    const { type, payload } = action
    switch (type) {
        case UserProfileActions.FETCH_PROFILE_STARTED: return { ...state, isLoading: true }
        case UserProfileActions.FETCH_PROFILE_SUCCESS: return { ...state, ...payload }
        case UserProfileActions.UPDATE_PROFILE_ERROR: return { ...state, error: payload.error }
        default: return state
    }
}