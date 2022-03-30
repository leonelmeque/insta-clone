import styled from "styled-components/native";
import React, { ComponentPropsWithRef, VoidFunctionComponent } from "react";
import { Image, ImageStyle } from "react-native";
import { CSSProperties } from "styled-components";

interface UserAvatarProps extends ComponentPropsWithRef<typeof Image> {
    size?: number | string;
    zIndex?: number;
    username?: string;
    usernamePlacement?: "right" | "bottom";
    hideUsernameLabel?: boolean;
}

const UserAvatar: VoidFunctionComponent<UserAvatarProps> = (props) => {
    return (
        <Container usernamePlacement={props.usernamePlacement}>
            <StyledAvatar style={props.style} {...props} />
            {!props.hideUsernameLabel && (
                <UserProfileName>{props.username}</UserProfileName>
            )}
        </Container>
    );
};

const Container = styled.View`
    flex-direction: ${(props: Pick<UserAvatarProps, "usernamePlacement">) =>
        props.usernamePlacement === "right" ? "row" : "column"};
    align-items: center;
`;

const StyledAvatar = styled.Image`
    width: ${(props: UserAvatarProps) => (props.size ? props.size + "px" : "32px")};
    height: ${(props: UserAvatarProps) => (props.size ? props.size + "px" : "32px")};
    border-radius: 999999px;
    margin: ${(props: UserAvatarProps & CSSProperties) =>
        // @ts-expect-error
        props.style?.margin || props.usernamePlacement === "right"
            ? "0px 8px 0px 0px"
            : "0px 0px 8px 0px"};
    z-index: ${(props) => (props.zIndex ? props.zIndex : 0)};
`;

const UserProfileName = styled.Text`
    font-weight: 600;
    font-size: 14px;
`;

export default UserAvatar;
