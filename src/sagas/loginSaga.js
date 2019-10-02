import { put, call } from 'redux-saga/effects';
import ACTIONS from '../actions/types';
import axios from 'axios';


export default function* signInSaga({ email, password }){
    yield put({ type: ACTIONS.LOGIN_REQUEST});

    const loginData = JSON.stringify({
        "user": {
            email,
            password,
            remember_me: 1
        } 
    });
    // const formData = new FormData();
    // formData.append('email', email);
    // formData.append('password', password);

    const { responseData, status } = yield call((data) => (
        axios.post("https://wondersourcing.ru/users/sign_in.json", data)
    ), loginData, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
    });
    console.log(responseData);
    console.log(status)

    if (status === 201){
        yield put({type: ACTIONS.LOGIN_RESPONSE, userData: responseData});
    } else {
        if (status === 401) {
            yield put({ type: ACTIONS.LOGIN_ERROR, error: responseData.error })
        } else {
            yield put({ type: ACTIONS.LOGIN_ERROR, error: "Unknown error" })
        }
    }

}