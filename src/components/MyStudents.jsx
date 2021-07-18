import React from 'react'
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { setError, intitalizeDb, signedIn, textboxValue } from '../redux/actions/loginActions';
import firebase from '../firebaseConfig'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { Nav } from './Nav';
import { Box, Container } from '@material-ui/core';
import useStyles from './styles';


const checkValues = (value) => {
    if (value[0].length === 0 ) return { status: false, message: "Student List cannot be empty" };
    let newSet = new Set(value);
    if (newSet.size !== value.length) return { status: false, message: "Duplicate Student Names" };;
    return { status: true };
}



export const MyStudents = () => {
    const classes = useStyles();
    const { user, textbox, adding, error, sessionId } = useSelector(state => state.login)
    const dispatch = useDispatch();
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        let studentNames = textbox.split(/[\n,]+/).sort()
        let checkData = checkValues(studentNames);
        if (checkData.status === false) {
            alert(checkData.message);
            return;
        }
        if (checkData.status === true) {
            dispatch(setError(""))
            dispatch(intitalizeDb(user.uid,studentNames));
        }
    }

    const authListner = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(signedIn(user))
            } else {
                dispatch(signedIn({}))
                history.push("/")
            }

        })
    }



    useEffect(() => {
        authListner();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    useEffect(() => {
        if(sessionId && !adding){
            history.push("/dashboard/"+sessionId);
        }
        

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId,adding])




    return (
        <Container className={classes.container}>
            <Nav location="mystudents" />
            <div className={classes.mystudentsroot}>
                <Typography variant="h2" component="h2" >
                    My Students
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                    Enter the names of each student who will answer your questions, separated by commas or a new line.
                </Typography>

                <textarea
                    className={classes.textareastudents}
                    rows="3" cols="50"
                    placeholder="Enter students names here"
                    value={textbox}
                    onChange={(e) => dispatch(textboxValue(e.target.value))}
                />
                <Box className={classes.boxstudent}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                    {error && <Typography variant="subtitle1" gutterBottom>Error while adding data</Typography>}
                    {adding && <Typography variant="subtitle1" gutterBottom>Submitting...</Typography>}
                </Box>
            </div>
        </Container>

    )
}
