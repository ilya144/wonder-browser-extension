import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import GetSelfReducer from './getSelfReducer';

const appReducer = combineReducers({
    LoginReducer,
    GetSelfReducer
})


const RootReducer = (state, action) => appReducer(state, action);
export default RootReducer;