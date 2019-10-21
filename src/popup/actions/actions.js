import ACTIONS from './types';

export const signIn = (email, password, rememberMe) => ({
    type: ACTIONS.LOGIN_ACTION,
    email,
    password,
    rememberMe
});

export const getSelf = () => ({
    type: ACTIONS.GET_SELF_ACTION
});