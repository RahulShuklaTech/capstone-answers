import { getStudentsFromFirebase, writeAnswersTOFirebase } from "../../firebaseMethods";

export const GET_STUDENTS = 'GET_STUDENTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_SELECTED_STUDENT = 'SET_SELECTED_STUDENT';
export const SET_ROUTING_INFO = 'SET_ROUTING_INFO';
export const SET_STUDENT_ANSWER = 'SET_STUDENT_ANSWER';

export const setRoutingInfo = (routingInfo) => { 
    return{
        type: SET_ROUTING_INFO,
        payload: routingInfo
    }
}



export const setAnswer = (data) => {
    return{
        type: SET_STUDENT_ANSWER,
        payload: data
    }
}



export const getStudents = (students) => { 
    return {
        type: GET_STUDENTS,
        payload: students
    };
}


export const setLoading = (loading) => { 
    return {
        type: SET_LOADING,
        payload: loading
    };
}

export const setSelectedStudent = (student) => {
    return {
        type: SET_SELECTED_STUDENT,
        payload: student
    };
}



export const getStudentNamesFromDB = (id,session) => {

    return async function (dispatch, getState) {
        dispatch(setLoading(true));
        let data =  await getStudentsFromFirebase(id,session);

        const studentNames = data.map(student => student.id);
        dispatch(getStudents(studentNames));
        console.log("data from db",session,data);
        dispatch(setLoading(false))
        

        // 

    }
}


export const writeStudentAnswers = (name,id,session,answer) => {
    return async function (dispatch, getState) {
        writeAnswersTOFirebase(name,id,session,answer)

    }
}