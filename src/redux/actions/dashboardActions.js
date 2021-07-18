import { firebaseListenersForStudents, getStudentsFromFirebase,deleteDataFromFirebase, clearInputsFromFirebase } from "../../firebaseMethods";
import {  setSessionId } from "./loginActions";

export const CLEAR_STUDENTS = 'CLEAR_STUDENTS';
export const DASHBOARD_LOADING = 'DASHBOARD_LOADING';
export const DASHBOARD_SET_STUDENTS = 'DASHBOARD_SET_STUDENTS';

export const clearStudents = () => {
    return {
        type: CLEAR_STUDENTS
    };
}


export const dashboardLoading = (data) => {
    return {
        type: DASHBOARD_LOADING,
        payload: data
    }
}

export const dashboardSetStudents = (data) => { 
    return {
        type: DASHBOARD_SET_STUDENTS,
        payload: data
    }
}



export const getDashboardData = (id,session,) => { 
    return async (dispatch) => {
        dispatch(dashboardLoading(true));
        const data = await getStudentsFromFirebase(id,session)
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(dashboardSetStudents(data));
        dispatch(dashboardLoading(false));
    }
}


export const setupListeners = (id,session) => {
    return async (dispatch,getState) => { 
        const { dashboardStudents} =  getState().dashboard;
        console.log("dashboard",dashboardStudents)
        dispatch(firebaseListenersForStudents(id,session,dashboardStudents))

    }

}


export const  deleteData = (id,session) => {
    return async (dispatch) => {
        dispatch(clearStudents());
        dispatch(setSessionId(""))
        await deleteDataFromFirebase(id,session)

    }
    
}

export const clearData = (id,session) => { 
    return async (dispatch) => {
        await  clearInputsFromFirebase(id,session)
    }
}