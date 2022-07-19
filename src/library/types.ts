export interface UserState<T = {}> {
  user?: T | any;
  posts?: any[];
  following?: any[];
  followers?: any[];
  feed: any[];
  usersFollowingLoaded?: any
}