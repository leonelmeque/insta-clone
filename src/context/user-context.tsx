import { User, UserState } from "library/types";
import React, { useContext, Dispatch } from 'react'
import { createContext, ReactNode, useReducer } from "react";

const initialState: UserState = {
  user: null,
  posts: [],
  followers: [],
  following: [],
  usersFollowingLoaded: false
}


type UserContext = {
  userState: typeof initialState
  userDispatch: Dispatch<Action>
}

const Context = createContext<UserContext>({ userState: initialState, userDispatch: () => ({}) })

type Action =
  | { type: "USER_STATE_CHANGE", payload: { uid: string, user: UserState['user'] } }
  | { type: "USER_LIKES_STATE_CHANGE" }
  | { type: "REMOVE_USER_FROM_STATE" }
  | { type: "USER_POSTS_STATE_CHANGE", payload: { posts: any[] } }
  | { type: "USER_FOLLOWING_STATE_CHANGE", payload: { [K in 'following' | 'followers']: string[] } }
  | { type: "CLEAR_DATA" }


function userReducer(state = initialState, action: Action): UserState {
  switch (action.type) {
    case 'USER_STATE_CHANGE': return {
      ...state,
      user: {
        uid: action.payload.uid,
        ...action.payload?.user as Omit<User, 'uid'>
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