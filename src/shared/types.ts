import { Action } from "redux"
import { AnyAction } from "redux"
// import { UserActions } from "@redux/constants"

// Loading states
export type LoadingState = 'idle' | 'pending' | 'success' | 'error'

// ActionTypes
export type AnyActionTypeWithPayload<A, P> = {
    type: A,
    payload?:P
}


// A & {payload?:P}