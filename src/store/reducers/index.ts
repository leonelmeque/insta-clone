import { combineReducers } from "redux";

import user from './user-reducer'
import feed from './feed-reducer'

const Reducers = combineReducers({
    userState: user,
    feedState: feed
})

export default Reducers