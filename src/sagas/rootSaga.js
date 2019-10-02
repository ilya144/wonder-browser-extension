import { takeLatest } from 'redux-saga/effects';
import ACTIONS from '../actions/types';
import LoginSaga from './loginSaga';

function* RootSaga() {
    yield takeLatest(ACTIONS.LOGIN_ACTION, LoginSaga);
}

export default RootSaga;