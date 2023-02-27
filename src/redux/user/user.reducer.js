import { UserActionTypes } from './user.types';
import {
    addItemToRegistrations,
    removeItemFromRegistrations,
    updateCurrentUserPersonalInfo,
    updateCurrentUserResidenceInfo,
    updateCurrentUserMembershipInfo,
    updateRegistrationAndEventNumbers,
} from './user.utils';
const INITIAL_STATE = {
    currentUser: {
        loading: true,
        isLoggedIn: false,
    },
};

const userReducer = (state = INITIAL_STATE, action) => {
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
        case UserActionTypes.ADD_REGISTRATION_TO_CURRENT_USER:
            return {
                ...state,
                currentUser: addItemToRegistrations(state, action.payload),
            };
        case UserActionTypes.REMOVE_REGISTRATION_FROM_CURRENT_USER:
            return {
                ...state,
                currentUser: removeItemFromRegistrations(
                    state.currentUser,
                    action.payload
                ),
            };
        case UserActionTypes.UPDATE_REGISTRATION_AND_EVENT_NUMBERS:
            return {
                ...state,
                currentUser: updateRegistrationAndEventNumbers(
                    state.currentUser,
                    action.payload
                ),
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
        case UserActionTypes.UPDATE_USER_PERSONAL_INFO:
            return {
                ...state,
                currentUser: updateCurrentUserPersonalInfo(
                    state,
                    action.payload
                ),
            };

        case UserActionTypes.UPDATE_USER_RESIDENCE_INFO:
            return {
                ...state,
                currentUser: updateCurrentUserResidenceInfo(
                    state,
                    action.payload
                ),
            };
        case UserActionTypes.UPDATE_USER_MEMBERSHIP_INFO:
            return {
                ...state,
                currentUser: updateCurrentUserMembershipInfo(
                    state,
                    action.payload
                ),
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
