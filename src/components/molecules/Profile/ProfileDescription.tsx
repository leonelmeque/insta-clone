import Box from "components/atoms/Box";
import Text from "components/atoms/Text";
import React, { FunctionComponent } from "react";

interface ProfileDescriptionProps {
    username: string;
    profileType: string;
    description: string;
}

const ProfileDescription: FunctionComponent<ProfileDescriptionProps> = ({
    username,
    profileType,
    description,
}) => (
    <Box style={{ paddingHorizontal: 14, marginVertical: 12 }}>
        <Text variant="body" color="textDark">
            {username}
        </Text>
        <Text variant="body" color="textLight" style={{ color: "#8e8e8e",fontSize:13.5 }}>
            {profileType}
        </Text>
        <Text variant="body" color="textDark">
            {description}
        </Text>
    </Box>
);

export default ProfileDescription;
