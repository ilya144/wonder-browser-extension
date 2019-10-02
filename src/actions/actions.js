import ACTIONS from './types';

export const signIn = (email, password) => ({
    type: ACTIONS.LOGIN_ACTION,
    email,
    password
})