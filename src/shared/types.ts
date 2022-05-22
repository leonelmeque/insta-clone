import { Action } from "redux"
import { AnyAction } from "redux"

// Loading states
export type LoadingState = 'idle' | 'pending' | 'success' | 'error'

// ActionTypes
export type AnyActionTypeWithPayload<A, P> = {
    type: A,
    payload?:P
}


export type User = {
    username: string;
    email: string;
    [key:string]: string;
}

export type UserInfo = {
    description?: string
    userType?: string
    following?: string[]
    followers?: string[]
    userProfilePicture?: string
    isPrivate?: boolean
}