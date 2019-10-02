import React from 'react';
import { connect } from 'react-redux';
import {
    Box,
    // Button,
    // Link,
    Avatar,
    // Typography
} from '@material-ui/core';


const HomePage = (props) => {

    return(
        <div>
            <Box display="flex" justifyContent="space-between">
                <Avatar src={props.userData} />
                <p>name here</p>
            </Box>
            (
                Date.parse(
                    props.userData.subscription.valid_through
                ) - Date.parse(
                    props.userData.subscription.updated_at
                ) > 0 
                    ? 
                <p>Доступ имеется</p>
                    : 
                <p>Доступ отстуствует, требуется оплата</p>
            )
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