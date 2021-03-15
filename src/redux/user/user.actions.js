import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_USER,
    payload: user,
});

export const updateCurrentUser = (user) => ({
    type: UserActionTypes.UPDATE_USER,
    payload: user,
});
export const clearUser = (user) => ({
    type: UserActionTypes.CLEAR_USER,
    payload: user,
});
