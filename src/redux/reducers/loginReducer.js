import {SIGNING_IN,SIGNED_IN, TEXTBOX_VALUE, SET_ADDING, SET_LOADING, SET_ERROR, SET_STUDENTS, SET_LASTPAGE, SET_SESSIONID, SET_ROUTING_INFO, SET_STUDENT_ANSWER_INDB } from '../actions/loginActions'

let initialState =  {
    user:{},
    disableButton: false,
    loading: true,
    adding: false,
    students: [],
    textbox: "",
    error: "",
    lastpage:"",
    sessionId: "",
    answers: {},
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
        case SET_ADDING: 
            return {...state, adding: action.payload}
        case SET_LOADING: 
            return {...state, loading: action.payload}
        case SET_ERROR: 
            return {...state, error: action.payload}
        case SET_STUDENTS: 
            let copy = [...state.students]
            copy.push(...action.payload)
            
            return {...state, students: copy}
        case SET_LASTPAGE: 
            return {...state, lastpage: action.payload}
        case SET_SESSIONID: 
            return {...state, sessionId: action.payload}

        case SET_STUDENT_ANSWER_INDB:
            let answers = state.answers
            answers[action.payload.id] = action.payload.answer
            // copy2.find(x => x.id === action.payload.id).answer = action.payload.answer
            return {...state, answers: state.answers}
        default:
            return state;
    }
}