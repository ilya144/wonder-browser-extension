import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';

const appReducer = combineReducers({
    LoginReducer
})


const RootReducer = (state, action) => appReducer(state, action);
export default RootReducer;