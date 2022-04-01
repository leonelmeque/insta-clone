import Box from "components/atoms/Box";
import Text from "components/atoms/Text";
import React, { useState, VoidFunctionComponent } from "react";
import { Dimensions, Image } from "react-native";

interface ProfileGalleryProps {
    posts: any[];
}

const Post = (props: { uri: string }) => {
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

    return (
        <Box
            style={{
                width: Dimensions.get("screen").width / 3,
                maxHeight: Dimensions.get("screen").width / 3,
            }}>
            {isImageLoading && (
                <Box style={{ flex: 1 }}>
                    <Text variant="body">Loading Image Content</Text>
                </Box>
            )}
            <Image
                style={{
                    aspectRatio: 1,
                    flex: 1,
                }}
                source={{ uri: props.uri }}
                onLoad={() => {
                    setIsImageLoading(false);
                }}
                onError={() => console.log("error loading asset")}
            />
        </Box>
    );
};

const ProfileGallery: VoidFunctionComponent<ProfileGalleryProps> = (props) => {
    return (
        <Box
            style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "flex-start",
                alignItems: "flex-start",
                paddingTop: 14,
                maxWidth: Dimensions.get("window").width,
                height: Dimensions.get("screen").height / 2,
                maxHeight: Dimensions.get("screen").height,
            }}>
            {props.posts?.map((item: any, index) => (
                <Post key={index.toString()} uri={item.downloadURL} />
            ))}
        </Box>
    );
};

export default ProfileGallery;
