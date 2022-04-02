import Box from "components/atoms/Box";
import Text from "components/atoms/Text";
import React, {  useState, VoidFunctionComponent } from "react";
import { Dimensions, Image } from "react-native";

interface ProfileGalleryProps {
    posts: any[];
}

const numColumns = 2;
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Post = (props: { uri: string }) => {
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

    return (
        <Box
            style={{
                width: WIDTH / 3,
                maxHeight: WIDTH / 3,
                alignContent: "stretch",
                alignItems: "stretch",
                position: "relative",
                padding: 1.5,
            }}>
            <Box
                style={{
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#c9c9c9",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    padding: 1,
                    display: isImageLoading ? "flex" : "none",
                }}></Box>
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
                maxWidth: WIDTH,
                height: HEIGHT / 2,
                maxHeight: HEIGHT,
            }}>
            {props.posts?.map((item: any, index) => (
                <Post key={item.downloadURL} uri={item.downloadURL} />
            ))}
        </Box>
    );
};

export default ProfileGallery;
