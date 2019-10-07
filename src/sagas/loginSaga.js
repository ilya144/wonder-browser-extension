import { put, call } from 'redux-saga/effects';
import ACTIONS from '../actions/types';
import axios from 'axios';


export default function* signInSaga({ email, password, rememberMe }){
    yield put({ type: ACTIONS.LOGIN_REQUEST});

    const loginData = { // use previously JSON.stringify, doesn't work
        "user": {
            email,
            password,
            remember_me: rememberMe
        } 
    };

    const { data, status } = yield call((data) => (
        axios.post("https://wondersourcing.ru/users/sign_in.json", data)
    ), loginData, {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
    });
    console.log(data);
    console.log(status);

    if (status === 201){
        yield put({type: ACTIONS.LOGIN_RESPONSE, userData: data});
        // TODO if (rememberMe) { setCookie(fromResponse) }
    } else {
        if (status === 401) {
            yield put({ type: ACTIONS.LOGIN_ERROR, error: data.error })
        } else {
            yield put({ type: ACTIONS.LOGIN_ERROR, error: "Unknown error" })
        }
    }

}