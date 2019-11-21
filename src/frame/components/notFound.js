import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Typography,
    Avatar,
    Grid,
    Button
} from "@material-ui/core";
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';


const useStyles = makeStyles(theme => ({
    userAvatar: {
        width: 60,
        height: 60
    },
    userGrid: {
        marginLeft: "20px",
        height: "100%",
        flexWrap: "nowrap"
    },
}));

const NotFound = props => {

    const classes = useStyles();

    return (
        <Box p="12px">
            <Box display="flex" alignItems="center" m="10px" height="64px">
                <Avatar
                    className={classes.userAvatar}
                    src=""
                />
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="flex-start"
                    className={classes.userGrid}
                >
                    <Typography variant="h6">
                        Пользователь не найден
                    </Typography>
                </Grid>
            </Box>
            {props.data.status==="unauthorized" ? 
            <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" justifyContent="center">
                    <Typography style={{color: "#000000"}}>Вы не авторизированы</Typography>
                    <PriorityHighIcon style={{color: "red"}} />
                </Box>
                <Button color="primary" target="_blank" href="https://wondersourcing.ru/users/sign_in" style={{color: "#3f51b5!important"}} >
                    Войти
                </Button>
            </Box>
            : null}
        </Box>
    )
}

export default NotFound;