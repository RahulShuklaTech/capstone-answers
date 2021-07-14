import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

import loginReducer from "./reducers/loginReducer";

const middleware = [thunk];

export const store = createStore(loginReducer, applyMiddleware(...middleware));