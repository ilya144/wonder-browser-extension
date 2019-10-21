import React, {useState} from 'react';
import Logo from '../ws-logo-bw.png';
import { makeStyles } from '@material-ui/core/styles'
import {
    Box,
    Button,
    Link,
    Avatar,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    toolbarTitleWonder: {
        fontWeight: 500
    },
    logo: {
        marginRight: theme.spacing(1)
    },
    toolbarTitle: {
        borderRight: `2px solid ${theme.palette.grey[700]}`,
        paddingRight: theme.spacing(3)
    },
}));

export default function Header(props) {
    const classes = useStyles();
  
    return(
        <Box display="flex" justifyContent="space-between">
            <Box flexGrow={1} display="flex" alignItems="center">
            <Link>
                <Avatar className={classes.logo} src={Logo} />
            </Link>
            <Typography
                component="h2"
                variant="h5"
                color="inherit"
                className={classes.toolbarTitleWonder}
                noWrap
            >
                Wonder
            </Typography>
            <Typography
                component="h2"
                variant="h5"
                color="inherit"
                noWrap
                className={classes.toolbarTitle}
            >
                Sourcing
            </Typography>
            </Box>
            <Button
            color="primary"
            onClick={() => {
                window.location.href = "https://wondersourcing.ru/users/sign_in";
            }}
            >
            регистрация
            </Button>
        </Box>
      
    )
}