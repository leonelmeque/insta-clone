// import { UserActions } from "redux/constants"
import { AnyAction } from "redux"
import { RemoveUserData, RemoveUserFromState, UserActionType, UserFollowingStateChange, UserPostsStateChange, UserStateChangeAction } from "store/constants"

export interface UserState<T = unknown> {
    user?: T;
    posts?: any[];
    following?: any[];
    followers?: any[];
    feed: any[];
    usersFollowingLoaded?: any
}

const initState: UserState = {
    user: null,
    posts: [],
    following: [],
    feed: [],
    usersFollowingLoaded:0
}

type Action = UserStateChangeAction | RemoveUserFromState | UserPostsStateChange | UserFollowingStateChange | RemoveUserData

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
        case UserActionType.USER_FOLLOWING_STATE_CHANGE: return {
            ...state,
            following: action.payload.following,
        }
        case UserActionType.CLEAR_DATA: return initState
        default: return state
    }
}