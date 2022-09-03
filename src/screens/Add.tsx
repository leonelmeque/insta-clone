// React imports
import React, { useRef } from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { Camera } from "expo-camera";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import styled from "styled-components/native";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { pickImage, takePicture } from "library/camera-features";
import { useCameraAccess } from "hooks/use-camera-access";

interface AddScreenProps extends NativeStackScreenProps<any> { }

const AddScreen: FunctionComponent<AddScreenProps> = ({ navigation }) => {

    const cameraRef = useRef<Camera>(null);
    const [image, setImage] = useState<string | undefined>(undefined);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const { hasCameraAccess, hasGalleryAccess } = useCameraAccess();

    if (!hasGalleryAccess || !hasCameraAccess) {
        return <View />;
    }

    if (!hasGalleryAccess || !hasCameraAccess) {
        return <Text>No access to camera</Text>;
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <CameraContainer>
                <StyledCamera ref={cameraRef} ratio="1:1" />
            </CameraContainer>
            <View style={{ flex: 1 }}>
                <StyledButton
                    title="Button"
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}
                />
                <Button title="Take picture" onPress={async () => { setImage(await takePicture(cameraRef)) }} />
                <Button title="Choose image from gallery" onPress={async () => setImage(await pickImage())} />
                <Button
                    title="Save"
                    onPress={() => navigation.navigate("global/uploadImage", { image })}
                />
                {image && <StyledImage source={{ uri: image }} />}
            </View>
        </ScrollView>
    );
};

const StyledImage = styled(Image)`
    flex: 1;
    width: 100%;
    height: 400px;
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
