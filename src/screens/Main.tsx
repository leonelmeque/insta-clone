// React imports
import React, { useEffect, useMemo } from "react";
import { FunctionComponent } from "react";

// Navigation imports
import { AppTabNavigation } from "@navigation/index";
import { UserState } from "redux/reducers/user";
import { bindActionCreators, Dispatch } from "redux";
import { loadData } from "@redux/actions";
import { connect, ConnectedProps } from "react-redux";

type RootState = {
    userState: UserState;
};

const mapStateToProps = (store: RootState): UserState => ({
    user: store.userState.user,
    posts: store.userState.posts,
    following: store.userState.following,
    feed: [],
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({ loadData }, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const MainScreen: FunctionComponent<Props> = (props) => {

    useEffect(() => {
        props.loadData();
        return () => {};
    }, []);

    return <AppTabNavigation />;
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
