/* eslint-disable react-hooks/exhaustive-deps */
import { TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswer, setSync, writeStudentAnswers } from '../redux/actions/studentActions'
import useStyles from './styles';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';











const StudentAnswer = () => {
    const classes = useStyles();


    const { selectedStudent, routingInfo, studentAnswer,sync } = useSelector(state => state.student)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = async (value) => {
        dispatch(setSync(false))
        dispatch(setAnswer(value));
        dispatch(writeStudentAnswers(selectedStudent, routingInfo[0], routingInfo[1], value));
        await new Promise(resolve => setTimeout(resolve, 500))
        dispatch(setSync(true))
    }

    useEffect(() => {
        if(!selectedStudent){
            history.goBack();
        }
    },[])


    return (
        <div className={classes.mystudents}>
            <div className={classes.studentAnswer}>
                <Typography variant="h2" component="h2" >
                    Student Answer
                </Typography>
                {selectedStudent}
                <Typography variant='subheading' component="h2" value={studentAnswer}>
                    Enter your answer below, this would be visible to your teacher.
                </Typography>
                <div style = {{textAlign: "left", margin: "0 auto"}}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Answer"
                        multiline
                        rows={6}
                        defaultValue="Answer here"
                        variant="outlined"
                        onChange={(e) => handleChange(e.target.value)}

                    />
                        
                    <Typography variant="caption" display="block" gutterBottom color="primary">
                        
                        {sync ? "Sync completed" : "Syncing "}
                    </Typography>
   
                </div>
            </div>
        </div>

    )
}

export default StudentAnswer
