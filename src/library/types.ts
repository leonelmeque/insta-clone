export type User = {
  uid: string
  email: string
  username: string
}

export interface UserState<T = {}> {
  user?: User | null;
  description?: string
  posts?: any[];
  isPrivate?: boolean
  following?: any[];
  followers?: any[];
  profilePicture?: string;
  userType?: string;
  usersFollowingLoaded?: any
}


export type PostProps = {
  isLiked?: boolean;
  likes: any;
  comments: any[];
  isSaved: boolean;
  postDate: string;
  username: string;
  postId?: string;
  name: string;
  [key: string]: any;
}

export type FeedPost = {
  ownerID: string,
  post: PostProps
}
export interface FeedState {
  users: any,
  usersFollowingLoaded: number;
  feedPosts: {
    [key: string]: PostProps[]
  },
  isLoading: boolean
}