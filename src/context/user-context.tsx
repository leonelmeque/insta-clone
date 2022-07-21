import { User, UserState } from "library/types";
import React, { useContext, Dispatch } from 'react'
import { createContext, ReactNode, useReducer } from "react";

const initialState: UserState = {
  user: null,
  posts: [],
  followers: [],
  following: [],
  usersFollowingLoaded: false,
  userType: "",
  description: "",
  isPrivate: false,
  profilePicture: ""
}


type UserContext = {
  userState: typeof initialState
  userDispatch: Dispatch<Action>
}

const Context = createContext<UserContext>({ userState: initialState, userDispatch: () => ({}) })

type Action =
  | { type: "USER_STATE_CHANGE", payload: { user: UserState['user'] } }
  | { type: "USER_DESCRIPTION_CHANGE", payload: { [key: string]: any } }
  | { type: "USER_LIKES_STATE_CHANGE" }
  | { type: "REMOVE_USER_FROM_STATE" }
  | { type: "USER_POSTS_STATE_CHANGE", payload: { posts: any[] } }
  | { type: "USER_FOLLOWING_STATE_CHANGE", payload: { [K in 'following' | 'followers']: string[] } }
  | { type: "CLEAR_DATA" }


function userReducer(state = initialState, action: Action): UserState {
  switch (action.type) {
    case 'USER_STATE_CHANGE': return {
      ...state,
      user: action.payload.user
    }
    case 'USER_DESCRIPTION_CHANGE': {
      console.log("USER_DESCRIPTION_CHANGE ", action.payload)
      return {
        ...state,
        ...action.payload
      }
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
      ...action.payload,
    }
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