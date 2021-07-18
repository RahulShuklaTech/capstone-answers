import { makeStyles } from '@material-ui/core/styles';

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
    textarea: {
        width: "50%",
        minHeight: "200px",
        border: "2px solid #303F9F",
        padding: "1rem"
    },
    box: {
        minWidth: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"

    },
    answer: {
        minWidth: "70%",
        maxWidth: "70%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        
    },
    answerTwo: {
        minWidth: "30%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },

    formControl: {
        margin: "",
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: "2rem",
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        minHeight: '100vh',
        minWidth: '100vw',
        maxWidth: '100vw',

    },
    studentPageContainer: {
        display: 'flex',
        width: "80%",
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1rem',
        marginTop: '2rem',

    },

    dashboard: {
        minWidth: "100%",
        display: "flex",
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: "1.5rem",
        
    },



    studentAnswer: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1rem',
        width: '50%',

    },
    mystudentsroot: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: "1rem",
        padding: '1rem',

    },
    mystudentsnew: {
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
    textareastudents: {
        width: "50%",
        minHeight: "200px",
        border: "2px solid #303F9F",
        padding: "1rem"
    },
    boxstudent: {
        display: "flex",
        gap: "3rem",
        alignItems: "center",
    },
    avatar: {
        minWidth: "8rem",
        minHeight: "8rem",
        borderRadius: "50%",
        color: "lightgrey",
        opacity: "0.8"
    }
    
});

export default useStyles;