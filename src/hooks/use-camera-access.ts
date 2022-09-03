import { Camera } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";

export const useCameraAccess = () => {
  const [hasGalleryAccess, setHasGalleryAccess] = useState<boolean | null>(null);
  const [hasCameraAccess, setHascameraAccess] = useState<boolean | null>(null);
  
  useEffect(() => {
      (async () => {
          const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
          setHascameraAccess(cameraStatus === "granted");

          const galleryStatus = await ImagePicker.getCameraPermissionsAsync();
          setHasGalleryAccess(galleryStatus.status === "granted");
          if (galleryStatus.status !== "granted") {
              //@ts-ignore
              alert("The app doesnt have permissions to use the camera roll");
          }
      })();
  }, []);

  return {
    hasGalleryAccess, 
    hasCameraAccess
  }
}