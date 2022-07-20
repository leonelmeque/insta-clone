import React from 'react'
import firebase from 'firebase';
import { useUser } from 'context/user-context';
import { useNavigation } from '@react-navigation/native';
import { getUser, getUserProfileInfo } from 'library/backend';

export function useAuth() {
    const [_, userDispatch] = useUser()
    const navigation = useNavigation()

    const onCheckLoginStatus = () => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) return

            const _user = await getUser(user.uid) as { email: string, username: string }
            const _userInfo = await getUserProfileInfo(user.uid)
            userDispatch({
                type: 'USER_STATE_CHANGE',
                payload: {
                    user: {
                        uid: user.uid,
                        ..._user
                    },
                    ..._userInfo
                }
            })
            //@ts-ignore
            navigation.navigate("global/main")
        });

    }

    const onSignIn = (email: string, password: string) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (result) => {
                const { user } = result
                const _user = await getUser(user?.uid as string) as { email: string, username: string }
                const _userInfo = await getUserProfileInfo(user?.uid as string)

                console.log(_userInfo)

                userDispatch({
                    type: 'USER_STATE_CHANGE',
                    payload: {
                        user: {
                            uid: user?.uid as string,
                            ..._user
                        },
                        ..._userInfo
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