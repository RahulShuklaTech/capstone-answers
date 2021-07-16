import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, CardContent, CardHeader, Container, Grid, Paper, Typography } from '@material-ui/core';
import { Nav } from './Nav';
import { useEffect } from 'react';
import firebase from '../firebaseConfig'
import { setLoading, setStudentAnswerInDB, setStudents, signedIn } from '../redux/actions/loginActions';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory, useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles({
    root: {
        width: '80%',
        minWidth: '80vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: "3rem",
        padding: '1rem',

    },
    mystudents: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
        // alignItems: 'center',

    },

    card: {
        minHeight: '200px',
        minWidth: '250px',
        maxWidth: '250px',
        borderColor: "blue",
        textAlign: 'left',
        padding: "5px 12px"
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

const getDataFromServer = async (dispatch, user, session,students) => {
    
    
    
    
    
    if (user.email) {
        
        const database = firebase.firestore();
        const usersRef = database.collection(user.uid).doc(session).collection("students");;
        
        
        
        if(!students.length ) {
            dispatch(setLoading(true));
            const data = await usersRef.get();
            let temp = [];
            data.forEach(doc => { 
                let obj =  doc.data();
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
    const { user, students, loading,answers } = useSelector(state => state.login)
    const { session } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();




    useEffect(() => {
        authListner(dispatch, history);
        


    }, [])

    useEffect(() => {
        if (user.email) {
            getDataFromServer(dispatch, user, session,students);
        }

    }, [user])


    useEffect(() => {
       if(students.length){ const database = firebase.firestore();
        const usersRef = database.collection(user.uid).doc(session).collection("students");;
        
        try{
            students.map(student => 
                usersRef.doc(student.id).onSnapshot(async snapshot => {
                    
                    if(snapshot.data()){

                        console.log("this",snapshot.data())  
                        let obj = snapshot.data();
                        obj.id = snapshot.id;  
                        console.log(answers)
                        dispatch(setStudentAnswerInDB(obj))

                    }
                    
                })
    
            )
            // usersRef.onSnapshot(async snapshot => {
            //     let data = [];
            //     snapshot.forEach(doc => {
            //         let value = doc.data();
            //         value.id = doc.id
            //         data.push(value)
            //     })
            //     if (data.length) {
            //         dispatch(setStudents(data))
            //     }
            // })
            }catch(e){ 
                console.log(e)
            }}
     }, [students])



    const handleEnd = async () => {
        if (user.email) {
            const database = firebase.firestore();

            const usersRef = database.collection(user.uid).doc(session).collection("students");

            const query = await usersRef.get()
            for (let docc of query.docs) {
                // console.log(`docc.data().id`, docc.id, usersRef.doc(docc.id))
                await usersRef.doc(docc.id).delete();

            }
            await database.collection(user.uid).doc(session).delete();
            dispatch(setStudents([]))
        }
        history.push("/mystudents")

    }



    if (loading && students.length === 0) return <div className={classes.loading}><LinearProgress /></div>
    return (
        <Container className={classes.mystudents}>


            <Paper elevation={3} spacing={3} className={classes.root} >
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
                    Student Link: <Link to={`/student/${user.uid}/${session}`} >http://localhost:3000/student/{user.uid}/{session}</Link>
                </Typography>
                <Grid container spacing={10}>
                    {
                        students.sort((a, b) => b.name - a.name).map((item, index) => {
                            return (
                                <Grid item key={index} >
                                    {/* {console.log("item", item)} */}
                                    <Box style = {{textAlign: "left"}}>
                                    <Typography variant="subtitle2" component="h4" color = "primary">{item.id}</Typography>
                                    <Card variant="outlined" className = {classes.card}> 
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
    )
}

export default Dashboard
