import React, { useEffect } from 'react';

import Container from '@material-ui/core/Container';
import HomePage from './components/homePage';
import LoginPage from './components/loginPage';
import { connect } from 'react-redux';
import { getSelf } from './actions/actions';


const App = (props) => {

    useEffect(() => {
        props.getSelf();
    }, [])

    return(
        <Container className="App" maxWidth="xs">
            {
                props.userData===null/*.id===undefined*/ ? <LoginPage/> : <HomePage/>
            }
        </Container>
    )
}

const mapStateToProps = (state) => {
    const { userData } = state.GetSelfReducer;
    return {userData}
}

const mapDispatchToProps = (dispatch) => ({
    getSelf: () => dispatch(getSelf())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);