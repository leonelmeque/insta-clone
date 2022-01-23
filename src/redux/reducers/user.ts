// import { UserActions } from "redux/constants"
import { AnyAction } from "redux"
import {  RemoveUserFromState, UserActionType, UserStateChangeAction } from "@redux/constants"

export interface UserState<T = unknown> {
    user?: T
}

const initState: UserState = {
    user: null,
}

type Action = UserStateChangeAction | RemoveUserFromState

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
        default: return state
    }
}