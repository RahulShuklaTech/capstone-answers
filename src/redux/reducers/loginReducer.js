import {SIGNING_IN,SIGNED_IN, TEXTBOX_VALUE } from '../actions/loginActions'

let initialState =  {
    user:{},
    disableButton: false,
    
    students: [],
    textbox: "",
}


export default function loginReducer(state = initialState, action) { 
    switch (action.type) {
        case SIGNING_IN:
            return {...state, disableButton: true}
        case SIGNED_IN:
            let user = action.payload
            return {...state, user, disableButton: false}
        case TEXTBOX_VALUE: 
            return {...state, textbox: action.payload}
        default:
            return state;
    }
}