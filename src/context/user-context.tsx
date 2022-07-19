import { UserState } from "library/types";
import React, { useContext, Dispatch } from 'react'
import { createContext, ReactNode, useReducer } from "react";
import {
  UserActionType,
} from "store/constants"

const initialState: UserState = {
  user: null,
  posts: [],
  followers: [],
  following: [],
  feed: [],
  usersFollowingLoaded: false
}


type UserContext = {
  userState: typeof initialState
  userDispatch: Dispatch<Action>
}


const Context = createContext<UserContext>({ userState: initialState, userDispatch: () => ({}) })

type Action =
  | { type: "USER_STATE_CHANGE", payload: Pick<UserState, 'user'> }
  | { type: "USER_LIKES_STATE_CHANGE" }
  | { type: "REMOVE_USER_FROM_STATE" }
  | { type: "USER_POSTS_STATE_CHANGE", payload: { posts: string[] } }
  | { type: "USER_FOLLOWING_STATE_CHANGE", payload: { following: string[] } }
  | { type: "CLEAR_DATA" }


function userReducer(state = initialState, action: Action): UserState {
  switch (action.type) {
    case 'USER_STATE_CHANGE': return {
      ...state,
      user: action.payload?.user
    }
    case 'REMOVE_USER_FROM_STATE': return {
      ...state,
      user: null
    }
    case 'USER_POSTS_STATE_CHANGE': return {
      ...state,
      posts: action.payload.posts
    }
    case "USER_FOLLOWING_STATE_CHANGE": return {
      ...state,
      following: action.payload.following,
    }
    // case UserActionType.USER_LIKES_STATE_CHANGE: return {
    //     ...state,
    //     feed: state.feed.map((post) => post.id === action.payload.postId ?
    //         { ...post, currentUserLike: action.payload.currentUserLike } : post
    //     )
    // }
    case UserActionType.CLEAR_DATA: return initialState
    default: return state
  }
}


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const value = {
    userState: state,
    userDispatch: dispatch
  }
  
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useUser = () => {
  const { userDispatch, userState } = useContext(Context)
  
  return [userState, userDispatch] as const
}

Context.displayName = "UserContextProvider"