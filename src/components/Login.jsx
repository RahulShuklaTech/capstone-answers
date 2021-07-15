import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import firebase from '../firebaseConfig';
import {  signedIn, signIn } from '../redux/actions/loginActions';
import "./styles/LoginStyle.css"
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { useLocation } from "react-router-dom";


export const Login = () => {

    const history = useHistory();
    const auth = firebase.auth();
    // const location = useLocation();


    const dispatch = useDispatch();
    const { disableButton,lastpage,students } = useSelector(state => state.login);


    useEffect(() => {
        if(lastpage){
            // console.log(location.pathname); // result: '/secondpage'
            console.log(lastpage); // result: 'some_value'
        }
        
     }, []);
 

    const signInWithGoogle = async () => {

        dispatch(signIn());

        try {
            await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
            const provider = new firebase.auth.GoogleAuthProvider();

            const result = await auth.signInWithPopup(provider);

            const user = result.user;

            dispatch(signedIn({ user }));


        } catch (error) {
            console.log("error", error.message)
        }
        lastpage === "dashboard" && students.length ?
        history.push("/dashboard")
        :history.push("/mystudents")
    
    }

    


    return (
        <div className="container">
            <Typography variant="h2" component="h2" >
                Everyone Answers
            </Typography>
            <p>Welcome. Please sign in.</p>
            <img src="avatar.png" alt="Avatar" className="avatar" />
            <Button
                variant="contained"
                color="default"
                startIcon={<img src="icon.svg" alt="google" />}
                disabled = {disableButton}
                onClick={signInWithGoogle}

            >Sign in</Button>
            
        </div>
    )
}
