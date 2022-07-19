import { combineReducers } from "redux";

import user from './user-reducer'
import feed from './feed-reducer'
import userProfileReducer from "./user-profile-reducer";

const Reducers = combineReducers({
    userInfo: userProfileReducer,
    userState: user,
    feedState: feed
})

export default Reducers