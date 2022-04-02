import { HomeAppBar } from "components/AppBar";
import UserPost from "components/organism/UserPost/UserPost";
import Stories from "components/Stories";
import React, { useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { UserState } from "store/reducers/user";
import { useEffect } from "react";
import { FeedState } from "store/reducers/feed";

type RootState = {
    userState: UserState<any>;
    feedState: FeedState;
};

const mapStateToProps = (store: RootState) => ({
    user: store.userState.user,
    following: store.userState.following,
    feed: store.feedState.feed,
    usersFollowingLoaded: store.feedState.usersFollowingLoaded,
});

const connector = connect(mapStateToProps, );

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

function FeedScreen(props: Props): JSX.Element {
    const [posts, setPosts] = useState<object[]>([]);

    function initFeed() {
        props.feed.sort((x: any, y: any) => y.creation.toDate() - x.creation.toDate());
        setPosts(props.feed);
    }

    useEffect(() => {
        if (
            props.usersFollowingLoaded !== props.following?.length &&
            props.following?.length !==0
        ) {
            initFeed();
        }
    }, [props.usersFollowingLoaded, props.feed]);

    return (
        <SafeAreaView>
            <HomeAppBar />
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                <Stories />
                <View style={{ flex: 1, marginBottom:79 }}>
                    <ScrollView>
                        {posts.map((item: any) => (
                            <UserPost key={item.id} {...item} />
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default connect(mapStateToProps, )(FeedScreen);
