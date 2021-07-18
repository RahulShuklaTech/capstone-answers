import { DASHBOARD_LOADING, DASHBOARD_SET_STUDENTS, CLEAR_STUDENTS } from "../actions/dashboardActions"

const initialState = {
    dashboardLoading: true,
    dashboardStudents: [],

}

export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case DASHBOARD_LOADING:
            return { ...state, dashboardLoading: action.payload }

        case DASHBOARD_SET_STUDENTS:
            return { ...state, dashboardStudents: action.payload }
        case CLEAR_STUDENTS:
            return { ...state, dashboardStudents: [] }

        default:
            return state
    }
}