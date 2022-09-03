import { Ref } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

export const takePicture = async (cameraRef: Ref<Camera>) => {
  if (!cameraRef) return
  // @ts-ignore
  const data = await cameraRef.current?.takePictureAsync();
  return data?.uri;
};

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) return result.uri;

};