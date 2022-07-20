export function fetchUser() {
  return ((dispatch: Dispatch) => {
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
  })
}

/**
* @description - returns a closure function that makes a fetch request to firebase api
* @returns Promise
*/
export function fetchUserPosts() {
  return ((dispatch: Dispatch<UserPostsStateChange>) => {
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
                      posts
                  }
              })
          })
  })
}

/**
* @description - returns users that the current user is following
*/

export function fetchUserFollowing() {
  return ((dispatch: Dispatch) => {
      firebase.default
          .firestore()
          .collection("following")
          .doc(firebase.default
              ?.auth()
              ?.currentUser
              ?.uid)
          .collection("userFollowing")
          .onSnapshot(snapshot => {
              let following = snapshot.docs.map(doc => doc.id)
              dispatch<UserFollowingStateChange>({
                  type: UserActionType.USER_FOLLOWING_STATE_CHANGE,
                  payload: {
                      following
                  }
              })

              for (let i = 0; i < following.length; i++) {
                  dispatch<any>(fetchUsersData(following[i]))
              }
          }

          )
  })
}

export function fetchUsersFollowingPosts(uid: string) {
  return ((dispatch: Dispatch, getState: any) => {
      firebase.default
          .firestore()
          .collection("posts")
          .doc(uid)
          .collection("userPosts")
          .orderBy("creation", "asc")
          .get()
          .then((snapshot) => {

              const uid = snapshot.docs[0].ref.path.split('/')[1]

              const user = getState().feedState.users.find((el: any) => el.uid === uid)

              let posts = snapshot.docs.map(doc => {
                  const data = doc.data()
                  const id = doc.id
                  return { id, ...data, user }
              })
              dispatch<any>({
                  type: FeedActionType.FEED_POSTS_STATE_CHANGE,
                  payload: {
                      usersFollowingLoaded: posts.length,
                      posts: posts as [],
                      uid
                  }
              })

          })
  })
}

export function fetchUsersData(uid: string) {
  return ((dispatch: Dispatch, getState: () => RootState) => {
      const found = getState().feedState.users.some((el: any) => el.uid === uid)
      if (!found) {
          firebase.default
              .firestore()
              .collection("users")
              .doc(uid)
              .get()
              .then((snapshot) => {
                  if (snapshot.exists) {
                      const user = snapshot.data()
                      //@ts-ignore
                      user.uid = snapshot.id
                      dispatch<any>({
                          type: FeedActionType.FEED_STATE_CHANGE,
                          payload: {
                              users: user as []
                          }
                      })
                      dispatch<any>(fetchUsersFollowingPosts(uid))
                  }
              })
      }
  })
}

