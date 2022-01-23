import * as firebase from "firebase"
import { Dispatch } from "redux"
import { RemoveUserFromState, UserActionType } from "@redux/constants"
import { UserState } from "@redux/reducers/user"
// import { UserActions } from "@redux/constants"


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