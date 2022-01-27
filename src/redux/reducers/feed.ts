import { FeedActionType, FeedPostsStateChange, FeedStateChangeAction } from "@redux/constants"
import { User } from "@shared/types"

export interface FeedState {
    users?: User[];
    usersLoaded: number;
    posts: []
}

const initState: FeedState = {
    users: [],
    usersLoaded: 0,
    posts: []
}

type Action = FeedPostsStateChange | FeedStateChangeAction

export default function feedReducer(state = initState, action: Action): FeedState {

    switch (action.type) {
        case FeedActionType.FEED_STATE_CHANGE: return {
            ...state,
            users: [...state.users as [], action.payload.users] as any
        }
        case FeedActionType.FEED_POSTS_STATE_CHANGE: return {
            ...state,
            usersLoaded: action.payload.usersLoaded + 1,
            users: state.users?.map((user:User)=>user.uid === action.payload.uid ? 
                {...user, posts: action.payload.posts} : user)
        }
        default: return state
    }
}