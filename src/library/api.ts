import firebase from 'firebase'
require("firebase/firestore")
require("firebase/storage")

export const fireBaseUploadImage = async ({ uri, caption }: { uri: string; caption: string }) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const savePostData = (downloadURL: string) => {
       return firebase.firestore().collection('posts').doc(firebase.auth().currentUser?.uid).collection("userPosts").add({
            downloadURL,
            caption:caption,
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