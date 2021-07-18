import { Box, Container, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles';


export const Error = ({ message }) => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Box color="text.primary" clone>
                <Typography color="text.primary" variant="h4">Error: {message}</Typography>
            </Box>
        </Container>
    )
}
