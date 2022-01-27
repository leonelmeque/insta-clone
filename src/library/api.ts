import firebase from 'firebase'
import { SetStateAction } from 'react'
import { Dispatch } from 'redux'

require("firebase/firestore")
require("firebase/storage")

export const fireBaseUploadImage = async ({ uri, caption }: { uri: string; caption: string }) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const savePostData = (downloadURL: string) => {
        return firebase.firestore().collection('posts').doc(firebase.auth().currentUser?.uid).collection("userPosts").add({
            downloadURL,
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


export const getUser = (uid: string) => {
    return firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                return snapshot.data()

            } else {
                return null
            }
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
        .collection("following")
        .doc(firebase.auth().currentUser?.uid)
        .collection("userFollowing")
        .doc(uid)
        .set({})
}

export const unFollowUser = (uid: string) => {
    return firebase
        .firestore()
        .collection("following")
        .doc(firebase.auth().currentUser?.uid)
        .collection("userFollowing")
        .doc(uid)
        .delete()
}

export const isFollowing = (uid: string)=> {
     return firebase
        .firestore()
        .collection("following")
        .doc(firebase.auth().currentUser?.uid)
        .collection("userFollowing")
        .doc(uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                console.log("Is already following")
                return true

            } else {
                console.log("does not follow")
                return false
            }
        })
}

