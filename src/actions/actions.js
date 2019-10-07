import ACTIONS from './types';

export const signIn = (email, password, rememberMe) => ({
    type: ACTIONS.LOGIN_ACTION,
    email,
    password,
    rememberMe
})