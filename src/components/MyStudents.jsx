import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { signedIn, textboxValue } from '../redux/actions/loginActions';
import firebase from '../firebaseConfig'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';



const useStyles = makeStyles({
    root: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'flex-start',
        gap: "1rem",
        padding: '1rem',

    },
    mystudents: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',

    },

    photo: {
        width: "4rem",
        height: "4rem",
        borderRadius: "50%",
        alignSelf: "flex-end"
    },
    textarea: {
        width: "50%",
        minHeight: "200px",
        border: "2px solid #303F9F",
        padding: "1rem"
    }
});


export const MyStudents = () => {
    const classes = useStyles();
    const { user,textbox } = useSelector(state => state)
    const dispatch = useDispatch();
    const history = useHistory();


    const handleSubmit = (event) => { 
        event.preventDefault();
        console.log("textbox",textbox.split(/[\n,]+/))
        

    }
    
    const authListner = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                dispatch(signedIn(user))
            }else{
                dispatch(signedIn({}))
                history.push("/")
            }

        })
    }


    const handleLogout = () => { 
        firebase.auth().signOut();
        history.push("/")
    }
    
    useEffect(() => {
        authListner();

    }, [])



    return (
        <div className={classes.mystudents}>
            <div className={classes.root}>
                <div className={classes.photo}>
                    {console.log("photo",user.photoURL)}
                    <img src={user.photoURL} alt="Sign out" className={classes.photo} onClick = {handleLogout}/>
                </div>
                <Typography variant="h2" component="h2" >
                    My Students
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                    Enter the names of each student who will answer your questions, separated by commas.
                </Typography>

                <textarea 
                    className={classes.textarea} 
                    rows="3" cols="50" 
                    placeholder="Enter students names here" 
                    value = {textbox}
                    onChange = {(e) => dispatch(textboxValue(e.target.value))}
                    />
                    {console.log(textbox)}

                <Button variant="contained" color="primary" onClick = {handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}
