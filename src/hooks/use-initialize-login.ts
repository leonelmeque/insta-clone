import { useAuth } from "./use-auth";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { useUser } from "context";
import { fetchUsersPosts, getFirebaseUser } from "library/backend";
import { fetchUserInfo } from "library/backend";
import { User } from "library/types";

export const useInitializeLogin = () => {
  const { onCheckLoginStatus } = useAuth()
  const [_, userDispatch] = useUser()

  const initUser = async () => {
    const user = await getFirebaseUser() as User
    const userInfo = await fetchUserInfo()

    userDispatch({
      type: 'USER_STATE_CHANGE',
      payload: {
        uid: user.uid,
        user: user,
        ...userInfo
      }
    })
  }

  const initUserPosts = async () => {
    const result = await fetchUsersPosts()
    userDispatch({
      type: 'USER_POSTS_STATE_CHANGE',
      payload: {
        posts: result
      }
    })
  }

  let [fontsLoaded] = useFonts({
    "MerriweatherSans-Regular": require("assets/fonts/MerriweatherSans-Regular.ttf"),
  });

  useEffect(() => {
    onCheckLoginStatus()
    initUser()
    initUserPosts()
  }, [])

  return { fontsLoaded }
}


