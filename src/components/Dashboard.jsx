import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, CardContent, CardHeader, Container, Grid, Paper, Typography } from '@material-ui/core';
import { Nav } from './Nav';
import { useEffect } from 'react';
import firebase from '../firebaseConfig'
import { setLoading, setStudents, signedIn } from '../redux/actions/loginActions';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';


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

    loading: {
        width: '50%',
        margin: '5rem auto'
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
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

    }
});

const getDataFromServer = async (dispatch, user) => {
    if (user.email) {
        dispatch(setLoading(true))
        const database = await firebase.firestore();
        // console.log(user)
        const title = user.email.replaceAll(".", "");
        const usersRef = database.collection(title);
        usersRef.onSnapshot(async snapshot => {
            let data = [];
            snapshot.forEach(doc => {
                data.push(({ ...doc.data(), id: doc.id }))
            })
            if (data.length) {
                dispatch(setStudents(data))
            }
        })



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
    const {  user, students, loading } = useSelector(state => state.login)
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();




    useEffect(() => {
        authListner(dispatch, history);


    }, [])

    useEffect(() => {
        if (user.email) {
            getDataFromServer(dispatch, user);
        }

    }, [user])

    const handleEnd = async () => {
        if (user.email) {
            const database = firebase.firestore();
            const title = user.email.replaceAll(".", "");
            const usersRef = database.collection(title);
            const query = await usersRef.get()
             for(let docc of query.docs){
                 console.log(`docc.data().id`, docc.id)
                 await usersRef.doc(docc.id).delete();
             }

        }
        history.push("/mystudents")
        // const title = user.email.replaceAll(".", "");
    //    await deleteCollection(title)
    }







    if (loading && students.length === 0) return <div className={classes.loading}><LinearProgress /></div>
    return (
        <Container className={classes.mystudents}>


            <Paper elevation={3} spacing={3} className={classes.root} style={{ minHeight: "100vh", minWidth: "90vw", padding: "1rem" }}>
                <Nav location="dashboard" />
                <Box className={classes.box} >
                    <Typography variant="h2" component="h2">
                        Dashboard
                    </Typography>
                    <Box >
                        <Button variant="contained" color="primary" onClick={() => handleEnd()}>End Session</Button>

                    </Box>
                </Box>
                <Typography variant="subtitle1" >
                    Student Link: <Link to="/">http://localhost:3000/s/students</Link>
                </Typography>
                <Grid container spacing={3}>
                    {
                        students.map((item, index) => {
                            return (
                                <Grid item xs={12} md={4} key={index}>
                                    <Card>
                                        <CardHeader title={item.name} />

                                        <CardContent>
                                            {/* {item.name} */}
                                            <Typography variant="subtitle1">{students[index].name === item.name && students[index].answer} </Typography>
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
