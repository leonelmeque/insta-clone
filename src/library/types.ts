type User = {
  uid: string
  email: string
  username: string
}

export interface UserState<T = {}> {
  user?: User;
  description?: string
  posts?: any[];
  isPrivate?: boolean
  following?: any[];
  followers?: any[];
  profilePicture?: string;
  userType?: string;
  usersFollowingLoaded?: any
}

export interface FeedState {
  users: any,
  usersFollowingLoaded: number;
  feedPosts: [],
  isLoading: boolean
}