import { useAuth } from "./use-auth";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { useUser } from "context";
import { fetchUsersPosts, getFirebaseUser } from "library/backend";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "library/backend";

export const useInitializeLogin = () => {
  const { onCheckLoginStatus } = useAuth()
  const [_, userDispatch] = useUser()

  const initUser = async () => {
    const result = await getFirebaseUser()
    const userInfo = await fetchUserInfo()
   
    userDispatch({
      type: 'USER_STATE_CHANGE',
      payload: {
        user: {
          ...result
        },
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


