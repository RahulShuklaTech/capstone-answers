import { getStudentsFromFirebase } from "../../firebaseMethods";

export const GET_STUDENTS = 'GET_STUDENTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_SELECTED_STUDENT = 'SET_SELECTED_STUDENT';
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



export const getStudentNamesFromDB = (id) => {

    return async function (dispatch, getState) {
        dispatch(setLoading(true));
        let data =  await getStudentsFromFirebase(id);
        const studentNames = data.map(student => student.name);
        dispatch(getStudents(studentNames));// dispatch(getStudents(data));
        console.log("data from db",data);
        dispatch(setLoading(false))
        

        // 

    }
}