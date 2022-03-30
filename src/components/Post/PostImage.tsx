import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

interface PostImageProps {
    [key: string]: any;
}

const PostImage: FunctionComponent<PostImageProps> = (props) => {
    return (
        <StyledPostImage
            source={{
                uri: props.downloadURL,
            }}
        />
    );
};

const StyledPostImage = styled.Image`
    width: 100%;
    height: 400px;
`;

export default PostImage;
