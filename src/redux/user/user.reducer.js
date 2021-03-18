import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: {
        loading: true,
        isLoggedIn: false,
    },
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
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
