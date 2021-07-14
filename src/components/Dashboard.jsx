import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, Container, Grid, Paper, Typography } from '@material-ui/core';
import { Nav } from './Nav';
import { useEffect } from 'react';
import firebase from '../firebaseConfig'
import { setLoading, setStudents, signedIn } from '../redux/actions/loginActions';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';




const useStyles = makeStyles({
    root: {
        width: '100%',
        minWidth: '100vw',
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




const Dashboard = () => {
    const { textbox, user, students,loading } = useSelector(state => state)
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    const getDataFromServer = async () => {
        dispatch(setLoading(true))
        const database = firebase.firestore();

        const title = user.email.replaceAll(".", "");
        const usersRef = database.collection(title);
        const doc = await usersRef.get();
        if (doc.empty) {
            return;
        }

        let data = [];
        doc.forEach((doc) => {
            
            data.push(doc.data());
        }
        )
        if(data.length){
            dispatch(setStudents(data))
        }
        
        console.log("students",students);
        dispatch(setLoading(false));

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
    useEffect(() => {
        authListner();
        getDataFromServer();
       

    }, [])

    if(loading) return <div>Loading...</div>
    // console.log("students",students)
    return (
        <Container  className={classes.mystudents}>
           

            <Paper elevation={3} spacing={3} className= {classes.root} style={{ minHeight: "100vh", minWidth: "90vw", padding: "1rem" }}>
            <Nav />
                <Typography variant="h2" component="h2">
                    Dashboard
                </Typography>
                <Typography variant="subtitle1" >
                    Student Link: <Link to = "/">http://localhost:3000/s/students</Link> 
                </Typography>
                <Grid container spacing={3}>
                    {
                        textbox.split(/[\n,]+/).sort().map((item, index) => {
                            return (
                                <Grid item xs={12} md={4} key={index}>
                                    <Card>
                                        <CardHeader title={item} />

                                        <CardContent>
                                            <Typography variant="subtitle1">{(students.length && students[index].name === item) && students[index].answer} </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Paper>
        </Container>
    )
}

export default Dashboard
