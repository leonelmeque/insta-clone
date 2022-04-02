import React from "react";
import { Feather } from "@expo/vector-icons";
import { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import Avatar from "components/molecules/Avatar/Avatar";
import Box from "components/atoms/Box";
import Text from "components/atoms/Text";

interface PostHeaderProps {
    [key: string]: any;
}

const PostHeader: FunctionComponent<PostHeaderProps> = (props) => {
    return (
        <Box style={style.container}>
            <Box
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <Avatar
                    source={{
                        uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80",
                    }}
                    size={28}
                />
                <Text style={style.usernameText} variant="body" color="textDark">{props.username}</Text>
            </Box>
            <Feather name="more-horizontal" size={24} />
        </Box>
    );
};



const style = StyleSheet.create({
    container: {
        width:'100%',
        flexDirection:'row',
        paddingVertical:12,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        alignItems:'center' 
    },
    usernameText:{
        marginLeft:8
    }
})


export default PostHeader;
