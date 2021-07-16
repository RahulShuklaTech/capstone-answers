import { GET_STUDENTS, SET_LOADING, SET_SELECTED_STUDENT, SET_ROUTING_INFO, SET_STUDENT_ANSWER, SET_STUDENT_ANSWER_INDB } from "../actions/studentActions";

let initialState = {
    studentNames: [],
    studentIds: [],
    studentAnswer: "",
    loading: false,
    selectedStudent: "",
    routingInfo: []
}

export default function StudentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload }

        case GET_STUDENTS:
            // let studentsCopy = [...state.studentNames];
            // let studentIdsCopy = [...state.studentIds];
            // let studentAnswersCopy = [...state.studentAnswers];
            // studentsCopy.push(...action.payload);
            return { ...state, studentNames: action.payload };

        case SET_SELECTED_STUDENT:
            return { ...state, selectedStudent: action.payload };

        case SET_ROUTING_INFO:
            let info = [...state.routingInfo]
            info.push(...action.payload)
            console.log("got info", info)

            return { ...state, routingInfo: info }
        



        case SET_STUDENT_ANSWER:
            return { ...state, studentAnswer: action.payload }

        default:
            return state;

    }

}