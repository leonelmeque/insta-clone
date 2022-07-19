export type LoadingState = 'idle' | 'pending' | 'success' | 'error'

export type AnyActionTypeWithPayload<A, P> = {
    type: A,
    payload?: P
}


export type User = {
    username: string;
    email: string;
    uid: string;
}

export type UserPosts = {
    id?: string
    bookmark: string[]
    comments: string[]
    likes: string[]
}

export type UserInfo = {
    id?: string
    description?: string
    userType?: string
    following?: string[]
    followers?: string[]
    userProfilePicture?: string
    isPrivate?: boolean
}

export type UserTimeline = {
    id: string
    event: {
        action: string
        timestamp: string
        userId: string
    }
}