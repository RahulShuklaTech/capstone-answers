import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { setAdding, setError, signedIn, textboxValue } from '../redux/actions/loginActions';
import firebase from '../firebaseConfig'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { Nav } from './Nav';
import { Box } from '@material-ui/core';



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
    },
    box: {
        display: "flex",
        gap: "3rem"
    }
});


const checkValues = (value) => { 
    if(value.length === 0) return  {status: false,message: "Student List cannot be empty"};
    let newSet = new Set(value);
    if(newSet.size !== value.length) return {status: false,message: "Duplicate Student Names"};;
    return {status: true};
}



export const MyStudents = () => {
    const classes = useStyles();
    const { user,textbox,adding,error } = useSelector(state => state)
    const dispatch = useDispatch();
    const history = useHistory();


    const handleSubmit = async (e) => { 
        e.preventDefault();
        let studentNames = textbox.split(/[\n,]+/).sort()
        let checkData = checkValues(studentNames);
        if(checkData.status === false) {
            alert(checkData.message);
            return;
        }
        if(checkData.status === true) { 
            dispatch(setError("")) 
            dispatch(setAdding(true))
            await await new Promise(resolve => setTimeout(resolve,800))
            const title = user.email.replaceAll(".","");
            const database = firebase.firestore();
            const usersRef = database.collection(title);

            for(let student of studentNames){
                try {
                    const id = await usersRef.doc();
                    await id.set({name: student, answer: ""});
                }catch(e){
                    console.log("error",e.message);
                    
                    dispatch(setError(e.message)) 
                }

            }

           
            dispatch(setAdding(false));
            history.push("/dashboard");
        }
            

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


    // const handleLogout = () => { 
    //     firebase.auth().signOut();
    //     history.push("/")
    // }
    
    useEffect(() => {
        authListner();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div className={classes.mystudents}>
           
            <div className={classes.root}>
            <Nav />
                {/* <div className={classes.photo}>
                    <img src={user.photoURL} alt="Sign out" className={classes.photo} onClick = {handleLogout}/>
                </div> */}
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
                <Box className = {classes.box}>
                <Button variant="contained" color="primary" onClick = {handleSubmit}>Submit</Button>
                {error && <p>Error adding data</p>}
                {adding && <p>Adding data </p>}
                </Box>
            </div>
        </div>
    )
}
