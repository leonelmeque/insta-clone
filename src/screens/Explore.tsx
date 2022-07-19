import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { searchUsers } from "library/backend";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamsList } from "navigation/types";
import InputText from "components/atoms/Input";
import Box from "components/atoms/Box";
import { Avatar } from "components/Avatar";
import { useNavigation } from "@react-navigation/native";

interface ExploreProps
    extends NativeStackScreenProps<StackParamsList, "explorer/explore"> {}

const Explore: React.FunctionComponent<ExploreProps> = (props): JSX.Element => {
    const [users, setUsers] = useState<{ username: string; id: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigation = useNavigation()

    const searchResults = () => (
        <FlatList
            data={users}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <Pressable
                    key={index.toString()}
                    onPress={() => {
                        //@ts-ignore
                        navigation.navigate("explorer/profile", {
                            uid: item.id,
                            profile: item.username,
                        });
                    }}>
                    <Box
                        style={{
                            flexDirection: "row",
                        }}>
                        <Avatar source={{ uri: item.username }} />
                        <Text>{item?.username}</Text>
                    </Box>
                </Pressable>
            )}
        />
    );

    useEffect(() => {
        if (!searchQuery) return;

        let cancelRequest: () => void = searchUsers(searchQuery, setUsers);

        return () => {
            if (typeof cancelRequest === "function") {
                cancelRequest();
            }
        };
    }, [searchQuery]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Box padding={16}>
                <InputText
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={(value) => {
                        setSearchQuery(value);
                        if (!value.length) {
                            setUsers([]);
                        }
                    }}
                />
                <Box
                    style={{
                        paddingTop: 12,
                    }}>
                        {searchResults()}
                    </Box>
            </Box>
        </SafeAreaView>
    );
};

export default Explore;
