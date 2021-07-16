import { GET_STUDENTS, SET_LOADING, SET_SELECTED_STUDENT, SET_ROUTING_INFO, SET_STUDENT_ANSWER, SET_SYNC_STATUS } from "../actions/studentActions";

let initialState = {
    studentNames: [],
    studentIds: [],
    studentAnswer: "",
    loading: false,
    selectedStudent: "",
    routingInfo: [],
    sync: true,
}

export default function StudentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload }

        case GET_STUDENTS:
            return { ...state, studentNames: action.payload };

        case SET_SELECTED_STUDENT:
            return { ...state, selectedStudent: action.payload };

        case SET_ROUTING_INFO:
            let info = [...state.routingInfo]
            info.push(...action.payload)
            return { ...state, routingInfo: info }
        
        case SET_STUDENT_ANSWER:
            return { ...state, studentAnswer: action.payload }

        case SET_SYNC_STATUS: 
            return { ...state, sync: action.payload }    
        default:
            return state;

    }

}