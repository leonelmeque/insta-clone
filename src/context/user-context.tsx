import { UserState } from "library/types";
import React from 'react'
import { createContext, ReactNode, useMemo, useReducer } from "react";
import { RemoveUserData, RemoveUserFromState, UserActionType, UserFollowingStateChange, UserLikesStateChange, UserPostsStateChange, UserStateChangeAction } from "store/constants"


const initialState = {
  user: {},
  posts: [],
  followers: [],
  following: [],
  feed: [],
  usersFollowingLoaded: false
}
const Context = createContext({})

type Action = UserStateChangeAction | RemoveUserFromState | UserPostsStateChange | UserFollowingStateChange | RemoveUserData | UserLikesStateChange


function userReducer(state = initialState, action: Action): UserState {
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
  const [state, dispatch] = useReducer<any>(initialState, userReducer)

  const value = useMemo(() => {
    return []
  }, [state])

  return <Context.Provider value={value} >{children}</Context.Provider>
}

Context.displayName = "UserContextProvider"