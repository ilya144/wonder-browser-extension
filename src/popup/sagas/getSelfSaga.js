import { put, call } from 'redux-saga/effects';
import ACTIONS from '../actions/types';
import axios from 'axios';

export default function* getSelfSaga(){
    yield put({ type: ACTIONS.GET_SELF_REQUEST});

    const { data, status, ...rest } = yield call((data) => (
        axios.get("https://wondersourcing.ru/customers/self", data, {
            withCredentials: true,
        })
    ));

    console.log(data);
    console.log(status);
    // console.log(rest);

    if (status === 200){
        yield put({type: ACTIONS.GET_SELF_RESPONSE, userData: data});
    } else {
        if (status === 401) {
            yield put({ type: ACTIONS.GET_SELF_ERROR, error: data.error })
        } else {
            yield put({ type: ACTIONS.GET_SELF_ERROR, error: "Unknown error" })
        }
    }
}