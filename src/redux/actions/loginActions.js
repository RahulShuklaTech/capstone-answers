import { intitalizeFirebase,  startFirebase,  } from "../../firebaseMethods";


export const SIGNING_IN = 'SIGNING_IN';
export const SIGNED_IN = 'SIGNED_IN';
export const TEXTBOX_VALUE = 'TEXTBOX_VALUE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ADDING =  'SET_ADDING';
export const SET_ERROR = 'SET_ERROR';
export const SET_STUDENTS = 'SET_STUDENTS';
export const SET_LASTPAGE = 'SET_LASTPAGE';
export const SET_SESSIONID = 'SET_SESSIONID';
export const SET_STUDENT_ANSWER_INDB = 'SET_STUDENT_ANSWER_INDB';
export const ENDING_SESSION = 'ENDING_SESSION';
export const CLEAR_ANSWERS = 'CLEAR_ANSWERS';
export const CLEAR_STUDENTS = 'CLEAR_STUDENTS';


export const clearStudents = () => {
    return {
        type: CLEAR_STUDENTS
    }
}



export const clearAnswers = (data) => {
    return {
        type: CLEAR_ANSWERS,
        payload: data
    }
}



export const endSession = (data) => { 
    return {
        type: ENDING_SESSION,
        payload: data
    }
}


export const lastPage = (data) => {
    return {
        type: SET_LASTPAGE,
        payload: data
    }
}

export const setStudentAnswerInDB = (data) => { 
    return{
        type: SET_STUDENT_ANSWER_INDB,
        payload: data
    }
}


export const setSessionId = (data) => { 
    return {
        type: SET_SESSIONID,
        payload: data
    }
}


export const setStudents = (data) => {
    return {
        type: SET_STUDENTS,
        payload: data
    }

}


export const setAdding = (data) => {    
    return {
        type: SET_ADDING,
        payload: data
    }
}

export const setLoading = (data) => {  
    return  {
        type: SET_LOADING,
        payload: data
    }
}

export const setError = (data) => {
    return {
        type: SET_ERROR,
        payload: data
    }
}



export const signIn = () => { 
    return {
        type: SIGNING_IN
    };
}


export const signedIn = (data) => { 
    return {
        type: SIGNED_IN,
        payload: data
    };
}


export const textboxValue = (data) => { 
    return {
        type: TEXTBOX_VALUE,
        payload: data
    }
}

export const intitalizeDb = (id,studentNames) => {
    return async function(dispatch,getState){    
        dispatch(setAdding(true));
        let sessionId = await intitalizeFirebase(id);
        dispatch(setSessionId(sessionId));
        await startFirebase(id,studentNames,sessionId);
        dispatch(setAdding(false));
    }
}








