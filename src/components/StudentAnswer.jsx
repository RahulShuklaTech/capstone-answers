/* eslint-disable react-hooks/exhaustive-deps */
import { TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readStudentAnswers, setAnswer, setSync, writeStudentAnswers } from '../redux/actions/studentActions'
import useStyles from './styles';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const StudentAnswer = () => {
    const classes = useStyles();


    const { selectedStudent, routingInfo, studentAnswer, sync } = useSelector(state => state.student)
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
        if (!selectedStudent) {
            history.goBack();
        }
    }, [])
    useEffect(() => {
       dispatch(readStudentAnswers(selectedStudent, routingInfo[0], routingInfo[1])) 
    }, [])

    useEffect(() => {
        if(studentAnswer === undefined) {
            dispatch(setAnswer(""))
        }
    }, [studentAnswer])




    return (
        <div className={classes.mystudents}>
            <div className={classes.studentAnswer}>
                <Typography variant="subtitle2">{selectedStudent}</Typography>
                <Typography variant="h2" component="h2" >
                    My Answer
                </Typography>

                <Typography variant='subheading' component="h2" value={studentAnswer}>
                    Enter your answer below, this would be visible to your teacher.
                </Typography>
                <div style={{ textAlign: "left", minWidth: "50rem" }}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Answer"
                        multiline
                        value={studentAnswer}
                        rows={16}
                        cols={50}
                        variant="outlined"
                        onChange={(e) => handleChange(e.target.value)}
                        style={{ textAlign: "left", minWidth: "40rem" }}
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
