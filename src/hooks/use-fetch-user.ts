import firebase from 'firebase'

export const useFetchUser = (uid: string) => {
  const user = firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.data()
      else return null
    })

  return user
}