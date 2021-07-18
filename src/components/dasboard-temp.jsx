/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, Container, Grid, Paper, Typography } from '@material-ui/core';
import { Nav } from './Nav';
import { useEffect } from 'react';
import firebase from '../firebaseConfig'
import { setLoading, setStudentAnswerInDB, setStudents, signedIn, endSession, clearAnswers, setSessionId, clearStudents } from '../redux/actions/loginActions';
import useStyles from './styles';
import { Link, useHistory, useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';




const getDataFromServer = async (dispatch, user, session, students) => {

    if (user.email) {

        const database = firebase.firestore();
        const usersRef = database.collection(user.uid).doc(session).collection("students");;

        if (!students.length) {
            dispatch(setLoading(true));
            const data = await usersRef.get();
            let temp = [];
            data.forEach(doc => {
                let obj = doc.data();
                obj.id = doc.id;
                temp.push(obj);
            })
            dispatch(setStudents(temp))
        }
        dispatch(setLoading(false));
    }
}


const authListner = async (dispatch, history) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            dispatch(signedIn(user))
        } else {
            dispatch(signedIn({}))
            history.push("/")
        }

    })
}


const Dashboard = () => {
    const { user, students, loading, answers, endsession, clearInfo, sessionId } = useSelector(state => state.login)
    const { session } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        authListner(dispatch, history);
    }, [])

    useEffect(() => {
        if (user.email) {
            console.log("dejhjhj", sessionId)
            getDataFromServer(dispatch, user, session, students);
        }

    }, [user])


    useEffect(() => {
        if (students.length) {
            const database = firebase.firestore();
            const usersRef = database.collection(user.uid).doc(session).collection("students");;
            try {
                students.map(student =>
                    usersRef.doc(student.id).onSnapshot(async snapshot => {

                        if (snapshot.data()) {
                            console.log("this", snapshot.data())
                            let obj = snapshot.data();
                            obj.id = snapshot.id;
                            console.log(answers)
                            dispatch(setStudentAnswerInDB(obj))
                        }
                    })
                )

            } catch (e) {
                console.log(e)
            }
        }
    }, [students])



    const handleEnd = async () => {
        if (user.email) {
            dispatch(endSession(true))
            dispatch(setSessionId(""))
            // dispatch(setStudents([]))
            dispatch(clearStudents())
            const database = firebase.firestore();

            const usersRef = database.collection(user.uid).doc(session).collection("students");

            const query = await usersRef.get()
            for (let docc of query.docs) {
                await usersRef.doc(docc.id).delete();

            }
            await database.collection(user.uid).doc(session).delete();
            dispatch(setStudents([]))
            dispatch(endSession(false))

        }
        history.push("/mystudents")

    }

    const handleClear = async () => {
        dispatch(clearAnswers(true))
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log("answer", answers)
        const database = firebase.firestore();

        const usersRef = database.collection(user.uid).doc(session).collection("students");

        const query = await usersRef.get()
        for (let docc of query.docs) {
            await usersRef.doc(docc.id).set({ answers: "" });

        }

        dispatch(clearAnswers(false))

    }



    if (loading && students.length === 0) return <div className={classes.loading}><LinearProgress /></div>
    return (
        <Container className={classes.container}>
            <Nav location="dashboard" />
            <Container className={classes.mystudents}>
                <Paper elevation={0} spacing={3} className={classes.root} >

                    <Box className={classes.box} >
                        <Box className={classes.answerTwo}>
                            <Typography variant="h2" component="h2">
                                Dashboard
                            </Typography>
                        </Box>
                        <Box className={classes.answer}>
                            <Button variant="contained" color="primary" onClick={handleClear}>Clear Answers</Button>
                            {endsession && <p style={{ color: "lightgray" }} >Ending Session... </p>}
                            {clearInfo && <p style={{ color: "lightgray" }} >Clearing Answers... </p>}
                            <Button variant="contained" onClick={() => handleEnd()}>End Session</Button>
                        </Box>
                    </Box>
                    <Typography variant="subtitle1" >
                        Student Link: <Link to={`/student/${user.uid}/${session}`} >http://localhost:3000/student/{user.uid}/{session}</Link>
                    </Typography>
                    <Grid container spacing={10}>
                        {
                            students.sort((a, b) => b.name - a.name).map((item, index) => {
                                return (
                                    <Grid item key={index} >
                                        <Box style={{ textAlign: "left" }}>
                                            <Typography variant="subtitle2" component="h4" color="primary">{item.id}</Typography>
                                            <Card variant="outlined" className={classes.card}>
                                                <Typography variant="subtitle1">{answers[item.id]}</Typography>
                                            </Card>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Paper>
            </Container>
        </Container>
    )
}

export default Dashboard
