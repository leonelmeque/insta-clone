import { useAuth } from "./use-auth";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export const useInitializeLogin = () => {
  const {onCheckLoginStatus} = useAuth()

  let [fontsLoaded] = useFonts({
      "MerriweatherSans-Regular": require("assets/fonts/MerriweatherSans-Regular.ttf"),
  });

  useEffect(()=>{
      onCheckLoginStatus()
  },[])

  return { fontsLoaded }
}


