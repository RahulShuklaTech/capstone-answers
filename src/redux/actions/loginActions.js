export const SIGNING_IN = 'SIGNING_IN';
export const SIGNED_IN = 'SIGNED_IN';
export const TEXTBOX_VALUE = 'TEXTBOX_VALUE';

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