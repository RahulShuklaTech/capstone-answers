import {applyMiddleware,  combineReducers,  createStore} from "redux";
import thunk from "redux-thunk";
// import {logger} from "redux-logger/src";
import loginReducer from "./reducers/loginReducer";
import StudentReducer from "./reducers/StudentReducer";


const rootReducer = combineReducers({ 
    login: loginReducer,
    student: StudentReducer
})

const middleware = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middleware));