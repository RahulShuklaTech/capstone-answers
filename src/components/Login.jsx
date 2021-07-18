import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import firebase from '../firebaseConfig';
import { setError, signedIn, signIn } from '../redux/actions/loginActions';
import Typography from '@material-ui/core/Typography';
import { Button, Container } from '@material-ui/core';
import useStyles from './styles';
import { Error } from './Error';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';





export const Login = () => {

    const history = useHistory();
    const auth = firebase.auth();
    const dispatch = useDispatch();
    const { disableButton, lastpage, students,error } = useSelector(state => state.login);
    const classes = useStyles();
    const signInWithGoogle = async () => {
        dispatch(signIn());
        try {
            await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await auth.signInWithPopup(provider);
            const user = result.user;
            dispatch(signedIn({ user }));
        } catch (error) {
            
            dispatch(setError(error.message))
            console.log("error", error.message)
        }
        lastpage === "dashboard" && students.length ?
            history.push("/dashboard")
            : history.push("/mystudents")

    }
    
    if(error.length) return <Error message = {error}/>




    return (
        <Container className={classes.container} >
            <Typography variant="h2" component="h2" style = {{marginTop: "4rem"}} >
                Everyone Answers
            </Typography>
            <Typography variant="h5" component="h5" >
                Welcome. Please sign in.
            </Typography>
            <AccountCircleIcon className = {classes.avatar} />
            
            <Button
                variant="contained"
                color="default"
                startIcon={<img src="icon.svg" alt="google" />}
                disabled={disableButton}
                onClick={signInWithGoogle}

            >Sign in with Google</Button>

        </Container>
    )
}
