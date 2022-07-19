import { User, UserInfo } from "shared/types";
import store from "store";


export type RootState = {
    userInfo: UserInfo,
    user: User,
    feedState:FeedState
}

export interface FeedState {
    users: any,
    usersFollowingLoaded: number;
    feedPosts: [],
    isLoading: boolean
}


export interface ProfileReducerProps extends UserInfo{
    isLoading?: boolean
    error?: string
}