import {applyMiddleware,  createStore} from "redux";
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";
import loginReducer from "./reducers/loginReducer";

const middleware = [thunk];

export const store = createStore(loginReducer, applyMiddleware(...middleware));