import { TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswer, writeStudentAnswers } from '../redux/actions/studentActions'

const StudentAnswer = () => {
    
    const {selectedStudent,routingInfo,studentAnswer} = useSelector(state => state.student)
    const dispatch = useDispatch();
    
    const handleChange = (value) => {
        dispatch(setAnswer(value));
        dispatch(writeStudentAnswers(selectedStudent,routingInfo[0],routingInfo[1],value));
        
    }


    return (
        <div>
            <Typography varient = "h2" component = "h1" >
                Student Answer
            </Typography>
            {selectedStudent}
            <Typography variant = 'subheading' component ="h2" value = {studentAnswer}>
                Enter your answer below, this would be visible to your teacher.
            </Typography>
            <TextField variant="outlined" multiline onChange = {(e) => handleChange(e.target.value)} style={{minWidth:"200px",minHeight: "250px"}}></TextField>
        </div>

)
}

export default StudentAnswer
