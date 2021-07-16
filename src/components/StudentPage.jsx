import { Button, LinearProgress, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentNamesFromDB, setSelectedStudent } from '../redux/actions/studentActions';
import { setRoutingInfo } from '../redux/actions/studentActions';




const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(2),
        marginTop: theme.spacing(3),

    }
}));

const StudentPage = () => {
    const classes = useStyles();
    let { id,session } = useParams();
    let { loading, studentNames,selectedStudent } = useSelector(state => state.student)
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudentNamesFromDB(id,session));
        dispatch(setRoutingInfo([id,session]))
    }, []);

    const handleSubmit = (e) => { 
        history.push("/student/answers")
    }

    if (loading) {
        return <LinearProgress />
    }
    return (
        <div className = {classes.container}>
            <Typography variant="h4" gutterBottom>
                Select Your Name
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select Name</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedStudent}
                    onChange={(e)=>{dispatch(setSelectedStudent(e.target.value))}}
                >{
                        studentNames.map(studentName =>

                            <MenuItem value={studentName}>{studentName}</MenuItem>
                        )}

                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={()=>{handleSubmit()}}>Continue</Button>

        </div>
    )
}

export default StudentPage
