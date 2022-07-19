import React from "react";
import { HomeAppBar } from "components/organisms/AppBar";
import { SafeAreaView, ScrollView } from "react-native";
import Box from "components/atoms/Box";
import { FeedProvider } from "context";
import Feed from "components/organisms/Feed";


function FeedScreen(): JSX.Element {
    return (
        <SafeAreaView style={{backgroundColor:"#fff"}}>
           <FeedProvider>
             <HomeAppBar />
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                <Box style={{ flex: 1, marginBottom:79}}>
                   <Feed />
                </Box>
            </ScrollView>
           </FeedProvider>
        </SafeAreaView>
    );
}

export default FeedScreen;
