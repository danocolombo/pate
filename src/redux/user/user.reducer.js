import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: {
        isLoggedIn: false,
    },
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
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
            };
        default:
            return state;
    }
};

export default userReducer;
