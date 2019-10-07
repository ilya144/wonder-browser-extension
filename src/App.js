import React from 'react';

import Container from '@material-ui/core/Container';
import HomePage from './components/homePage';
import LoginPage from './components/loginPage';
import { connect } from 'react-redux';


const App = (props) => {

    return(
        <Container className="App" maxWidth="xs">
            {
                props.userData.id===undefined ? <LoginPage/> : <HomePage/>
            }
        </Container>
    )
}

const mapStateToProps = (state) => {
    const { userData } = state.LoginReducer;
    return {userData}
}

export default connect(mapStateToProps, null)(App);