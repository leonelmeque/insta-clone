import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamsList } from "@navigation/types";
import React from "react";
import { FunctionComponent } from "react";
import { View, TextInput, Image, Button } from "react-native";
import styled from "styled-components/native";
import { useState } from "react";
import { fireBaseUploadImage } from "@library/backend";

interface UploadImageProps
    extends NativeStackScreenProps<StackParamsList, "UploadImage"> {}

const UploadImage: FunctionComponent<UploadImageProps> = (props) => {
    const [caption, setCaption] = useState<string | undefined>();

    return (
        <View style={{ flex: 1 }}>
            <StyledImage source={{ uri: props.route.params.image }} />
            <StyledTextInput
                placeholder="Write a Caption"
                onChangeText={(caption) => setCaption(caption)}
            />
            <StyledButton
                title="Save"
                onPress={async () => {
                    await fireBaseUploadImage({
                        uri: props.route.params.image,
                        caption: caption as string,
                    });
                    props.navigation.popToTop();
                }}
            />
        </View>
    );
};

const StyledButton = styled(Button)``;

const StyledTextInput = styled(TextInput)``;

const StyledImage = styled(Image)``;

export default UploadImage;
