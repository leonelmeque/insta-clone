import firebase from 'firebase'

export const usefetchUserPosts = () => {
  const posts = firebase
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

  return posts
}