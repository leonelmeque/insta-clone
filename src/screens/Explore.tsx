import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { searchUsers } from "library/backend";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamsList } from "navigation/types";

interface ExploreProps extends NativeStackScreenProps<StackParamsList, "explorer/explore"> {}

const Explore: React.FunctionComponent<ExploreProps> = (props): JSX.Element => {
    const [users, setUsers] = useState<{ username: string; id: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

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
            <View>
                <TextInput
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={(value) => {
                        setSearchQuery(value);
                        if (!value.length) {
                            setUsers([]);
                        }
                    }}
                />
                <FlatList
                    data={users}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <Pressable
                            key={index.toString()}
                            onPress={() => {
                                props.navigation.navigate("explorer/profile", {
                                    uid: item.id,
                                    profile: item.username,
                                });
                            }}>
                            <Text>{item?.username}</Text>
                        </Pressable>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default Explore;
