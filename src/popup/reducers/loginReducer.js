import ACTIONS from '../actions/types';

const initialState = {
    userData: {},
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOGIN_ACTION: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTIONS.LOGIN_RESPONSE: {
            return {
                ...state,
                userData: action.userData,
                isFetching: false,
                error: null
            }
        }
        case ACTIONS.LOGIN_ERROR: {
            return {
                ...state,
                error: action.error,
                isFetching: false
            }
        }
        default: {
            return state
        }
    }
}