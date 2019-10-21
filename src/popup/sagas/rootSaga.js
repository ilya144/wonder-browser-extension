import { takeLatest } from 'redux-saga/effects';
import ACTIONS from '../actions/types';
import LoginSaga from './loginSaga';
import GetSelfSaga from './getSelfSaga';

function* RootSaga() {
    yield takeLatest(ACTIONS.LOGIN_ACTION, LoginSaga);
    yield takeLatest(ACTIONS.GET_SELF_ACTION, GetSelfSaga);
}

export default RootSaga;