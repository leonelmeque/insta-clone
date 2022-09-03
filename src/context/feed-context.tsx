import React from 'react'
import { FeedPost, FeedState, PostProps } from "library/types";
import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

const initialFeedState: FeedState = {
  feedPosts: {},
  isLoading: true,
  users: [],
  usersFollowingLoaded: 0
}

type FeedContext = {
  feedState: typeof initialFeedState
  feedDispatch: Dispatch<Action>
}

const Context = createContext<FeedContext>({ feedState: initialFeedState, feedDispatch: () => { } })


type Action =
  | { type: "FEED_LOADING_STARTED", }
  | { type: "FEED_LOADING_ENDED" }
  | { type: "FEED_STATE_CHANGE", payload: { users: any[] } }
  | { type: "FEED_POSTS_STATE_CHANGE", payload: { usersFollowingLoaded: number, key: string, posts: PostProps[] } }


export default function feedReducer(state = initialFeedState, action: Action): FeedState {
  switch (action.type) {
    case 'FEED_LOADING_STARTED': return {
      ...state,
      isLoading: true
    }
    case 'FEED_LOADING_ENDED': return {
      ...state,
      isLoading: false
    }
    case 'FEED_STATE_CHANGE': return {
      ...state,
      users: [...state.users as [], action.payload.users] as any
    }
    case 'FEED_POSTS_STATE_CHANGE': {
      const { feedPosts } = state
      const { key, posts } = action.payload
   
      const temp = feedPosts[key] || []
    
      const newPosts = [...temp, ...posts]
      feedPosts[key] = newPosts as PostProps[]
      // const temp = [...feedPosts, action.payload.posts]

      // temp.sort((x: any, y: any) => y.creation.toDate() - x.creation.toDate());

      return {
        ...state,
        feedPosts: feedPosts
      }
    }
    default: return state
  }
}

export const FeedProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(feedReducer, initialFeedState)
  const value = {
    feedState: state,
    feedDispatch: dispatch
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useFeed = () => {
  const { feedDispatch, feedState } = useContext(Context)
  return {
    feedState,
    feedDispatch
  }
}

Context.displayName = "FeedContextProvider"
