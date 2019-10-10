import React from 'react';
import { connect } from 'react-redux';
import {
    Box,
    // Button,
    // Link,
    Avatar,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    FIO: {
        whiteSpace: "nowrap"
    }
}));

const HomePage = (props) => {

    const classes = useStyles()

    return(
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Avatar src={props.userData.avatar_url} />
                <Typography className={classes.FIO}>
                {props.userData.first_name} {props.userData.last_name}<br />
                {props.userData.middle_name}
                </Typography>
            </Box>
            {   
                props.userData.subscription &&
                Date.parse(
                    props.userData.subscription.valid_through
                ) - Date.parse(
                    props.userData.subscription.updated_at
                ) > 0 
                    ? 
                <p>Доступ имеется</p>
                    : 
                <p>Доступ отстуствует, требуется оплата</p>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const { userData } = state.LoginReducer;
    return {
        userData
    }
}

export default connect(mapStateToProps, null)(HomePage);