import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from "remote-redux-devtools"
import rootReducer from "store/reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


export default store