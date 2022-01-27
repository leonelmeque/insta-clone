import * as firebase from "firebase"
import { Dispatch } from "redux"
import { RemoveUserFromState, UserActionType, UserPostsStateChange, UserFollowingStateChange, FeedActionType, FeedPostsStateChange, FeedStateChangeAction } from "@redux/constants"
import { UserState } from "@redux/reducers/user"
import { RootState } from "redux/store"


export function fetchUser() {
    return (dispatch: Dispatch) => {
        firebase.default
            .firestore()
            .collection("users")
            .doc(firebase.default
                ?.auth()
                ?.currentUser
                ?.uid)
            .get()
            .then((snapshop) => {
                if (snapshop.exists) {
                    dispatch({
                        type: UserActionType.USER_STATE_CHANGE,
                        payload: {
                            user: snapshop.data()
                        }
                    })
                } else {
                    dispatch<RemoveUserFromState>({
                        type: UserActionType.REMOVE_USER_FROM_STATE,
                        payload: {
                            user: null
                        }
                    })
                }
            })
    }
}

/**
 * @description - returns a closure function that makes a fetch request to firebase api
 * @returns Promise
 */
export function fetchUserPosts() {
    return (dispatch: Dispatch<UserPostsStateChange>) => {
        firebase.default
            .firestore()
            .collection("posts")
            .doc(firebase.default
                ?.auth()
                ?.currentUser
                ?.uid)
            .collection("userPosts")
            .orderBy('creation', 'asc')
            .get()
            .then((snapshop) => {
                const posts = snapshop.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id
                    return {
                        id, ...data
                    }
                })

                dispatch({
                    type: UserActionType.USER_POSTS_STATE_CHANGE,
                    payload: {
                        posts: posts
                    }
                })
            })
    }
}

/**
 * @description - returns users that the current user is following
 */

export function fetchUserFollowing() {
    return (dispatch: Dispatch) => {
        firebase.default
            .firestore()
            .collection("following")
            .doc(firebase.default
                ?.auth()
                ?.currentUser
                ?.uid)
            .collection("userFollowing")
            .onSnapshot(snapshot => {
                let following = snapshot.docs.map(doc => {
                    const id = doc.id

                    return id
                })
                dispatch<UserFollowingStateChange>({
                    type: UserActionType.USER_FOLLOWING_STATE_CHANGE,
                    payload: {
                        following: following
                    }
                })
                for (let i = 0; i < following.length; i++) {
                    fetchFeedPosts(following[i])
                }
            }

            )
    }
}

export function fetchFeedPosts(uid: string) {
    return ((dispatch: Dispatch, getState: any) => {
        firebase.default
            .firestore()
            .collection("posts")
            .doc(uid)
            .collection("userPosts")
            .orderBy("creation", "asc")
            .get()
            .then((snapshot) => {
                //@ts-expect-error
                const uid = snapshot.query.EP.path.segments[1]
                console.log(snapshot, uid)
                const user = getState().feedState.users.find((el: any) => el.uid === uid)

                let posts = snapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id
                    return { id, ...data, user }
                })

                dispatch<FeedPostsStateChange>({
                    type: FeedActionType.FEED_POSTS_STATE_CHANGE,
                    payload: {
                        // usersLoaded: posts.length,
                        posts: posts as [],
                        uid
                    }
                })
            })
    })
}

export function fetchFeed(uid: string) {
    return ((dispatch: Dispatch, getState: RootState) => {
        const found = getState().feedState.users.some((el: any) => el.uid === uid)
        if (!found) {
            firebase.default
                .firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        const user = snapshot.data()
                        //@ts-ignore
                        user.uid = snapshot.id
                        dispatch<FeedStateChangeAction>({
                            type: FeedActionType.FEED_STATE_CHANGE,
                            payload: {
                                users: user as []
                            }
                        })
                    }
                })
        }
    })
}

