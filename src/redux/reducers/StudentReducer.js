import { GET_STUDENTS, SET_LOADING, SET_SELECTED_STUDENT } from "../actions/studentActions";

let initialState = {
    studentNames: [],
    studentIds: [],
    studentAnswers: [],
    loading: false,
    selectedStudent: ""
}

export default function StudentReducer(state = initialState, action) {
    switch (action.type) { 
        case SET_LOADING: 
            return {...state, loading: action.payload}

        case GET_STUDENTS:
            // let studentsCopy = [...state.studentNames];
            // let studentIdsCopy = [...state.studentIds];
            // let studentAnswersCopy = [...state.studentAnswers];
            // studentsCopy.push(...action.payload);
            return {...state, studentNames: action.payload};

        case SET_SELECTED_STUDENT:
            return {...state, selectedStudent: action.payload};
            
        default: 
            return state;

    }

}