export interface UserState<T = {}> {
  user?: T | any;
  posts?: any[];
  following?: any[];
  followers?: any[];
  feed: any[];
  usersFollowingLoaded?: any
}

export interface FeedState {
  users: any,
  usersFollowingLoaded: number;
  feedPosts: [],
  isLoading: boolean
}