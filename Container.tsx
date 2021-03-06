import { useInitializeLogin } from "hooks";
import { GlobalNavigation } from "navigation/main";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-svg";
import React from 'react'

export default function Container(){
  const { fontsLoaded, userLoaded } = useInitializeLogin();

  if (!fontsLoaded || !userLoaded) {
      return (
          <SafeAreaView>
              <View>
                  <Text>Loading app</Text>
              </View>
          </SafeAreaView>
      );
  }

  return  <GlobalNavigation />

}