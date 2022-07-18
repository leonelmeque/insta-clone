import firebase from 'firebase'

export const useCheckFollow = (uid: string) => {
    const result =  firebase
    .firestore()
    .collection("following")
    .doc(firebase.auth().currentUser?.uid)
    .collection("userFollowing")
    .doc(uid)
    .get()
    .then((snapshot) => {
        if (snapshot.exists) return true
        else return false
    })

    return result
}