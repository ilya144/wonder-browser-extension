import { put, call } from 'redux-saga/effects';
import ACTIONS from '../actions/types';
import axios from 'axios';


/**
 *  Сага авторизации
 */
export default function* signInSaga({ email, password, rememberMe }){
    yield put({ type: ACTIONS.LOGIN_REQUEST});

    const loginData = { // use previously JSON.stringify, doesn't work
        "user": {
            email,
            password,
            remember_me: rememberMe
        } 
    };

    // unset throwing error for proper saga's work
    axios.interceptors.response.use(response => {
        return response;
      }, error => {
        return error.response;
      });

    const { data, status, ...rest } = yield call((data) => (
        axios.post("https://wondersourcing.ru/users/sign_in.json", data, {
            withCredentials: true,
        })
    ), loginData);
    
    // console.log(data);
    // console.log(status);
    // console.log(rest);

    if (status === 201){
        yield put({type: ACTIONS.LOGIN_RESPONSE, userData: data});
    } else {
        if (status === 401) {
            yield put({ type: ACTIONS.LOGIN_ERROR, error: data.error })
        } else {
            yield put({ type: ACTIONS.LOGIN_ERROR, error: "Unknown error" })
        }
    }

}