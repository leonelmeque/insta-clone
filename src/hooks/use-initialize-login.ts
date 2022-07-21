import { useAuth } from "./use-auth";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { useUser } from "context";
import { fetchUserPosts, getFirebaseUser } from "library/backend";
import { fetchUserInfo } from "library/backend";
import { User, UserState } from "library/types";

export const useInitializeLogin = () => {
  const [userLoaded, setUserLoaded] = useState(false)

  const { onCheckLoginStatus } = useAuth()
  const [userState, userDispatch] = useUser()

  const initUser = async () => {
    const user = await getFirebaseUser() as User
    userDispatch({
      type: 'USER_STATE_CHANGE',
      payload: {
        user: user
      }
    })
  }

  const initUserPosts = async () => {
    const result = await fetchUserPosts(userState.user?.uid as string)
    userDispatch({
      type: 'USER_POSTS_STATE_CHANGE',
      payload: {
        posts: result
      }
    })
  }

  const initUserInformation = async () => {
    const userInfo = await fetchUserInfo() as Omit<UserState, 'user'>
    userDispatch({
      type: 'USER_DESCRIPTION_CHANGE',
      payload: {
        ...userInfo
      }
    })
    setUserLoaded(true)
  }

  let [fontsLoaded] = useFonts({
    "MerriweatherSans-Regular": require("assets/fonts/MerriweatherSans-Regular.ttf"),
  });

  useEffect(() => {
    onCheckLoginStatus()
    initUser().then(() => {
      return initUserPosts()
    }).then(() => {
      initUserInformation()
    })
  }, [])

  return { fontsLoaded, userLoaded }
}


