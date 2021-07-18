/* eslint-disable react-hooks/exhaustive-deps */
import { Button, LinearProgress, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentNamesFromDB, setSelectedStudent } from '../redux/actions/studentActions';
import { setRoutingInfo } from '../redux/actions/studentActions';
import useStyles from './styles';


const StudentPage = () => {
    const classes = useStyles();
    let { id, session } = useParams();
    let { loading, studentNames, selectedStudent } = useSelector(state => state.student)
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudentNamesFromDB(id, session));
        dispatch(setRoutingInfo([id, session]))
    }, []);

    const handleSubmit = (e) => {
        history.push("/student/answers")
    }

    if (loading) {
        return <LinearProgress />
    }
    return (
        <div className={classes.mystudents}>
            <div className={classes.studentPageContainer}>

                <Typography variant="h4" gutterBottom>
                    Select Your Name
                </Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label" >Select Name</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedStudent}
                        onChange={(e) => { dispatch(setSelectedStudent(e.target.value)) }}
                        style = {{minWidth: "12rem"}}
                    >{
                            studentNames.map((studentName) =>

                                <MenuItem key={studentNames} value={studentName}>{studentName}</MenuItem>
                            )}

                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={() => { handleSubmit() }}>Continue</Button>
            </div>
        </div>
    )
}

export default StudentPage
