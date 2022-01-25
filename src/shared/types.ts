import { Action } from "redux"
import { AnyAction } from "redux"

// Loading states
export type LoadingState = 'idle' | 'pending' | 'success' | 'error'

// ActionTypes
export type AnyActionTypeWithPayload<A, P> = {
    type: A,
    payload?:P
}
