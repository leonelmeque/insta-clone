// React imports
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { FunctionComponent } from 'react';
import { Camera, CameraNativeProps } from 'expo-camera';
import {
  Alert,
  Button,
  Image,
  PermissionStatus,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
interface AddScreenProps extends NativeStackScreenProps<any> {}

const AddScreen: FunctionComponent<AddScreenProps> = ({navigation}) => {
  const [hasGalleryAccess, setHasGalleryAccess] = useState<
    boolean | null
  >(null);
  const [hasCameraAccess, setHascameraAccess] = useState<
    boolean | null
  >(null);
  // const
  const cameraRef = useRef<Camera>(null);
  const [image, setImage] = useState<string | undefined>(
    undefined
  );
  const [type, setType] = useState(
    Camera.Constants.Type.back
  );

  const takePicture = async () => {
    if (cameraRef) {
      const data =
        await cameraRef.current?.takePictureAsync();
      setImage(data?.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      setHascameraAccess(cameraStatus === 'granted');

      const galleryStatus =
       await ImagePicker.getCameraPermissionsAsync()
      setHasGalleryAccess(galleryStatus.status==='granted')
      if (galleryStatus.status !== 'granted') {
        //@ts-ignore
        alert(
          'The app doesnt have permissions to use the camera roll'
        );
      }
    })();
  }, []);

  useEffect(() => {
    console.log('Camera access ', hasCameraAccess);
    console.log('Gallery Access ', hasGalleryAccess);
    return () => {
    
    };
  });

  if (!hasGalleryAccess || !hasCameraAccess) {
    return <View />;
  }
  if (!hasGalleryAccess || !hasCameraAccess) {
    return <Text>No access to camera</Text>;
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <CameraContainer>
        <StyledCamera ref={cameraRef} ratio='1:1' />
      </CameraContainer>
      <View style={{ flex: 1 }}>
        <StyledButton
          title='Button'
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        />

        <Button
          title='Take picture'
          onPress={() => takePicture()}
        />
        <Button
          title='Choose image from gallery'
          onPress={() => pickImage()}
        />
        <Button
          title='Save'
          onPress={() => navigation.navigate("UploadImage", {image})}
        />
        {image && <StyledImage source={{ uri: image }} />}
      </View>
    </ScrollView>
  );
};

const StyledImage = styled(Image)`
  flex:1;
  width:100%;
  height:400px;
  resize-mode: cover;
`;

const StyledButton = styled(Button)`
  flex: 0.1;
  align-self: flex-end;
  align-items: center;
`;

const CameraContainer = styled(View)`
  flex: 1;
  flex-direction: row;
`;

const StyledCamera = styled(Camera)`
  flex: 1;
  aspect-ratio: 1;
`;
const styles = StyleSheet.create({});
export default AddScreen;
