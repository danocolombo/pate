import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: {
        loading: true,
        isLoggedIn: false,
    },
};

const userReducer = (state = INITIAL_STATE, action) => {
    console.log('____________IN userReducer: ' + action.type);
    if (action.type === 'UPDATE_USER') {
        const util = require('util');
        console.log(
            'action.payload: ' +
                util.inspect(action.payload, { showHidden: false, depth: null })
        );
    }
    switch (action.type) {
        case UserActionTypes.SET_USER:
        case UserActionTypes.UPDATE_USER:
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
            };
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
            };
        case UserActionTypes.LOGIN_FAIL:
            return {
                ...state,
                currentUser: null,
            };
        case UserActionTypes.LOAD_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        case UserActionTypes.CLEAR_USER:
            return {
                ...state,
                currentUser: null,
                loading: true,
            };
        default:
            return state;
    }
};

export default userReducer;
