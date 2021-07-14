import React from 'react'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import firebase from '../firebaseConfig'




const useStyles = makeStyles({
    root: {
        width: '100%',
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




export const Nav = () => {
    const classes = useStyles();
    const history = useHistory();

    const { user } = useSelector(state => state)
    const handleLogout = () => { 
        firebase.auth().signOut();
        history.push("/")
    }
    

    return (
            <div className={classes.root}>
            <div className={classes.photo}>
                    <img src={user.photoURL} alt="Sign out" className={classes.photo} onClick = {handleLogout}/>
                </div>
            </div>
        
    )
}
