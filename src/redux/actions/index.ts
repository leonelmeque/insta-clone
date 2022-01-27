import * as firebase from "firebase"
import { Dispatch } from "redux"
import { RemoveUserFromState, UserActionType, UserPostsStateChange } from "@redux/constants"
import { UserState } from "@redux/reducers/user"


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