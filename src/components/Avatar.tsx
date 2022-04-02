import styled from "styled-components/native";
import React from "react";

interface AvatarProps extends React.CSSProperties {
    size?: number | string;
}

const StyledAvatar = styled.Image`
    width: ${(props: AvatarProps) => (props.size ? props.size + "px" : "32px")};
    height: ${(props: AvatarProps) => (props.size ? props.size + "px" : "32px")};
    border-radius: 999999px;
    margin-right: 8px;
    z-index: ${(props) => (props.zIndex ? props.zIndex : 0)};
`;

export { StyledAvatar as Avatar };
