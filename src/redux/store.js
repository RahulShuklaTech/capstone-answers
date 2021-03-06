import {applyMiddleware,  combineReducers,  createStore} from "redux";
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";
import loginReducer from "./reducers/loginReducer";
import StudentReducer from "./reducers/StudentReducer";
import dashboardReducer from "./reducers/dasboardReducer";


const rootReducer = combineReducers({ 
    login: loginReducer,
    student: StudentReducer,
    dashboard: dashboardReducer
    
})

const middleware = [thunk,logger];

export const store = createStore(rootReducer, applyMiddleware(...middleware));