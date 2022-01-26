// import { UserActions } from "redux/constants"
import { AnyAction } from "redux"
import { RemoveUserFromState, UserActionType, UserPostsStateChange, UserStateChangeAction } from "@redux/constants"

export interface UserState<T = unknown> {
    user?: T;
    posts?: any[]
}

const initState: UserState = {
    user: null,
    posts: []
}

type Action = UserStateChangeAction | RemoveUserFromState | UserPostsStateChange

export default function userReducer(state = initState, action: Action): UserState {
    switch (action.type) {
        case UserActionType.USER_STATE_CHANGE: return {
            ...state,
            user: action.payload?.user
        }
        case UserActionType.REMOVE_USER_FROM_STATE: return {
            ...state,
            user: null
        }

        case UserActionType.USER_POSTS_STATE_CHANGE: return {
            ...state,
            posts: action.payload.posts
        }
        default: return state
    }
}