export const SIGNING_IN = 'SIGNING_IN';
export const SIGNED_IN = 'SIGNED_IN';
export const TEXTBOX_VALUE = 'TEXTBOX_VALUE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ADDING =  'SET_ADDING';
export const SET_ERROR = 'SET_ERROR';
export const SET_STUDENTS = 'SET_STUDENTS';
export const SET_LASTPAGE = 'SET_LASTPAGE';



export const lastPage = (data) => {
    return {
        type: SET_LASTPAGE,
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




// export const addTeacherToDb = (teacher) => { 
//     return async function (dispatch, getState) {
        
//     }
// }