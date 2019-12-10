import React, { useEffect } from 'react';

import Container from '@material-ui/core/Container';
import HomePage from './components/homePage';
import LoginPage from './components/loginPage';
import { connect } from 'react-redux';
import { getSelf } from './actions/actions';


const App = (props) => {

    useEffect(() => {
        props.getSelf();
    }, [props.userDataLogin])

    return(
        <Container className="App" maxWidth="xs">
            {
                props.userData===null ? <LoginPage/> : <HomePage/>
            }
        </Container>
    )
}

const mapStateToProps = (state) => {
    const { userData } = state.GetSelfReducer;
    const userDataLogin = state.LoginReducer;
    return {userData, userDataLogin}
}

const mapDispatchToProps = (dispatch) => ({
    getSelf: () => dispatch(getSelf())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);