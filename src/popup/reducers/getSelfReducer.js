import ACTIONS from '../actions/types';

const initialState = {
    userData: {},
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTIONS.GET_SELF_ACTION: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTIONS.GET_SELF_RESPONSE: {
            return {
                ...state,
                userData: action.userData,
                isFetching: false,
                error: null
            }
        }
        case ACTIONS.GET_SELF_ERROR: {
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