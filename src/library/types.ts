export interface UserState<T = unknown> {
  user?: T;
  posts?: any[];
  following?: any[];
  followers?: any[];
  feed: any[];
  usersFollowingLoaded?: any
}