import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Box,
    Button,
    // Link,
    Avatar,
    Typography
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    FIO: {
        whiteSpace: "nowrap"
    }
}));

const HomePage = (props) => {

    const classes = useStyles();
    return(
        <div>
            {
                /*global chrome*/
                chrome.cookies.getAll({"name": "_wonder_frontend_session"}, (cookie) => {
                    console.log(cookie);
                })
            }
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Avatar src={props.userData.avatar_url} />
                <Typography className={classes.FIO}>
                {props.userData.first_name} {props.userData.last_name}<br />
                {props.userData.middle_name}
                </Typography>
            </Box>
            {   
                props.userData.profiles_subscription &&
                Date.parse(
                    props.userData.profiles_subscription.valid_through
                ) - Date.parse(
                    props.userData.profiles_subscription.updated_at
                ) > 0 
                    ? 
                <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="row">
                        <Typography>Доступ имеется</Typography>
                        <DoneIcon />
                    </Box>
                </Box>
                    : 
                <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="row">
                        <Typography>Доступ отстуствует, требуется оплата</Typography>
                        <BlockIcon />
                    </Box>
                    <Button color="primary">Перейти к оплате</Button>
                </Box>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const { userData } = state.GetSelfReducer;
    return {
        userData
    }
}

export default connect(mapStateToProps, null)(HomePage);