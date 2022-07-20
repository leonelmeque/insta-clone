import firebase from 'firebase'
import { SetStateAction } from 'react'
import { UserInfo } from 'shared/types';

export const fireBaseUploadImage = async ({ uri, caption }: { uri: string; caption: string }) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const savePostData = (imageUrl: string) => {
        return firebase.firestore().collection('posts').doc(firebase.auth().currentUser?.uid).collection("userPosts").add({
            imageUrl,
            bookmarks: [],
            comments: [],
            likes: [],
            caption: caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const task = firebase
        .storage()
        .ref()
        .child(`post/${firebase.auth().currentUser?.uid}/${Math.random().toString(36)}`)
        .put(blob)

    const taskProgress = (snapshot: any) => console.log(`Transfer: ${snapshot.bytesTransferred}`)

    const taskCompleted = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot: any) => {
            return savePostData(snapshot)
        })
    }

    const taskError = (snapshot: any) => {
        console.log(`Firebase error: ${snapshot}`)
    }

    task.on("state_changed", taskProgress, taskError, taskCompleted)
}

export const searchUsers = (query: string, callback: SetStateAction<any>) => {
    return firebase.firestore().collection('users').where('username', '!=', query).onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
            const data = doc.data()
            const id = doc.id
            return { id, ...data }
        })
        callback(data)

    }, (err) => {
        console.log(err.message)
    })
}

export const updateUserInfo = ({ description, isPrivate, userProfilePicture, userType }: UserInfo) => {
    return firebase.firestore().collection('userInfo').doc(firebase.auth().currentUser?.uid).set({ description, userProfilePicture, userType, isPrivate })
}

export const getUserProfileInfo = (uid: string) => {
    return firebase
        .firestore()
        .collection('userInfo')
        .doc(uid)
        .get().then((snapshop) => {
            if (snapshop.exists) return snapshop.data()
            else return null
        })
}

export const getUser = (uid: string) => {
    return firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) return snapshot.data()
            else return null
        })
}

export const fetchUserPosts = (uid: string) => {
    return firebase
        .firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .orderBy('creation', 'asc')
        .get()
        .then((snapshot) => {
            return snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return {
                    id, ...data
                }
            })
        })

}

export const followUser = (uid: string) => {
    return firebase
        .firestore()
        .collection("userInfo")
        .doc(firebase.auth().currentUser?.uid)
        .set({ following: firebase.firestore.FieldValue.arrayUnion(uid) }, { merge: true })
        .then(() => {
            return firebase
                .firestore()
                .collection("userInfo").doc(uid)
                .set({ followers: firebase.firestore.FieldValue.arrayUnion(uid) }, { merge: true })
        }).catch((err) => {
            console.log(err)
        })
}

export const unFollowUser = (uid: string) => {
    return firebase
        .firestore()
        .collection("userInfo")
        .doc(firebase.auth().currentUser?.uid)
        .set({ following: firebase.firestore.FieldValue.arrayRemove(uid) }, { merge: true })
        .then(() => {
            return firebase
                .firestore()
                .collection("userInfo").doc(uid)
                .set({ followers: firebase.firestore.FieldValue.arrayRemove(uid) }, { merge: true })
        })
}

export const isFollowing = (uid: string) => {
    return firebase
        .firestore()
        .collection("userInfo")
        .doc(uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                let doeFollow = false
                const { followers = [] } = snapshot.data() as any

                followers.forEach((item: string) => {
                    if (item === uid) doeFollow = true
                })

                return doeFollow
            }
            else return false
        })
}

export const onSignIn = (email: string, password: string) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
            return result
        })
        .catch((result) => {

        });
};

export const onLogOut = () => {
    return firebase.auth().signOut().then((result) => { }).catch((err) => { })
}

export const onSignUp = (email: string, password: string, username: string) => {
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

export const authFetchUserPosts = () => {
    return firebase
        .firestore()
        .collection("posts")
        .doc(firebase
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
            return posts
        })
}


export const getFirebaseUser = () => {
    return firebase
        .firestore()
        .collection("users")
        .doc(
            firebase?.auth()?.currentUser?.uid
        )
        .get()
        .then(snapshot => {
            if (snapshot.exists) {
                return {
                    uid: firebase?.auth()?.currentUser?.uid,
                    ...snapshot.data()
                }
            } else {
                return null
            }
        })
}


export const fetchUsersPosts = () => {
    return firebase.firestore()
        .collection("posts")
        .doc(firebase?.auth()?.currentUser?.uid)
        .collection("userPosts")
        .orderBy('creation', 'asc')
        .get()
        .then(snapshot => {
            const posts = snapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                return {
                    id, ...data
                }
            })
            return posts
        })
}

export const fetchUserInfo = (uid?: string) => {
    return firebase.firestore()
        .collection("userInfo")
        .doc(
            uid || firebase?.auth()?.currentUser?.uid
        )
        .get()
        .then(snapshot => {
            if (snapshot.exists) return snapshot.data()
            return null
        })

}