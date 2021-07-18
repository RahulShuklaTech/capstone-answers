/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, Container, Grid, Typography } from '@material-ui/core';
import { Nav } from './Nav';
import { useEffect } from 'react';
import firebase from '../firebaseConfig'
import { signedIn, endSession, clearAnswers, textboxValue } from '../redux/actions/loginActions';
import useStyles from './styles';
import { Link, useHistory, useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { clearData,  deleteData, getDashboardData, setupListeners } from '../redux/actions/dashboardActions';


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
    const { user, answers, endsession, clearInfo } = useSelector(state => state.login)
    const { dashboardLoading, dashboardStudents } = useSelector(state => state.dashboard);
    const { session } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        authListner(dispatch, history);
    }, [])

    useEffect(() => {
        if (user.email) {
            dispatch(getDashboardData(user.uid, session))
        }
    }, [user])


    useEffect(() => {
        if (dashboardStudents.length) {
            try {
                dispatch(setupListeners(user.uid, session))
            } catch (e) {
                console.log(e)
            }
        }
    }, [dashboardStudents])



    const handleEnd = async () => {
        if (user.email) {
            dispatch(endSession(true));
            dispatch(deleteData(user.uid, session))
            await new Promise(resolve => setTimeout(resolve, 1000))
            dispatch(textboxValue(''))
            dispatch(endSession(false));
        }
        history.push("/mystudents")

    }

    const handleClear = async () => {
        dispatch(clearAnswers(true))
        await new Promise(resolve => setTimeout(resolve, 1000))
        dispatch(clearData(user.uid, session))
        dispatch(clearAnswers(false))

    }


    if (dashboardLoading) return <div className={classes.loading}><LinearProgress /></div>
    return (
        <Container className={classes.container}>
            <Nav location="dashboard" />
            <Container className={classes.dashboard}>

                <Box className={classes.box}  >
                    <Box className={classes.answerTwo}>
                        <Typography variant="h2" component="h2">
                            Dashboard
                        </Typography>
                    </Box>
                    <Box className={classes.answer}>
                        <Button variant="contained" color="primary" onClick={handleClear}>Clear Answers</Button>
                        {endsession && <p >Ending Session... </p>}
                        {clearInfo && <p >Clearing Answers... </p>}
                        <Button variant="contained" onClick={() => handleEnd()}>End Session</Button>
                    </Box>
                </Box>
                <Typography variant="subtitle1" >
                    Student Link: <Link to={`/student/${user.uid}/${session}`} >http://localhost:3000/student/{user.uid}/{session}</Link>
                </Typography>
                <Grid container spacing={10}>
                    {
                        dashboardStudents.sort((a, b) => b.name - a.name).map((item, index) => {
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
            </Container>
        </Container>
    )
}

export default Dashboard
