import React, { useContext } from 'react'
import firebase from 'firebase';
import { useUser } from 'context/user-context';
import { useNavigation } from '@react-navigation/native';
import { getUser } from 'library/backend';

export function useAuth() {
    const [userState, userDispatch] = useUser()
    const navigation = useNavigation()

    const onCheckLoginStatus = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) return
            userDispatch({
                type: 'USER_STATE_CHANGE',
                payload: {
                    user: {
                        uid: user.uid,
                     
                    }
                }
            })
            navigation.navigate("global/main")
        });

    }

    const onSignIn = (email: string, password: string) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                userDispatch({
                    type: 'USER_STATE_CHANGE',
                    payload: {
                        user: {
                            uid: result.user?.uid
                        }
                    }
                })
                // @ts-ignore
                navigation.navigate("global/main")
            })
            .catch((result) => {

            });
    };

    const onSignUp = (email: string, password: string, username: string) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(firebase.auth()?.currentUser?.uid)
                    .set({
                        username,
                        email,
                    });
            })
            .catch((result) => {
                console.log(result);
            });
    };

    const onLogOut = async () => {
        return await firebase.auth().signOut().then((result) => {
            userDispatch({
                type: 'REMOVE_USER_FROM_STATE',
            })
        }).catch((err) => { })
    }

    return {
        onSignIn,
        onLogOut,
        onSignUp,
        onCheckLoginStatus
    }
}