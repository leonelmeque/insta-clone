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
        {/* the username */}
        <Text variant="body" color="textDark">
            {username}
        </Text>
        <Text variant="body" color="textLight" style={{ color: "grey" }}>
            {profileType}
        </Text>
        <Text variant="body" color="textDark">
            {description}
        </Text>
    </Box>
);

export default ProfileDescription;
