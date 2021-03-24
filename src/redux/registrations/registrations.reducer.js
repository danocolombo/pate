import { RegistrationsActionTypes } from './registrations.types';

const INITIAL_STATE = {
    currentRegistrations: {
        isLoading: false,
        count: 0,
    },
};

const registrationsReducer = (state = INITIAL_STATE, action) => {
    console.log('____________IN REDUCER: ' + action.type);
    switch (action.type) {
        case RegistrationsActionTypes.LOAD_REGISTRATIONS:
            return {
                ...state,
                currentRegistrations: action.payload,
            };
        case RegistrationsActionTypes.CLEAR_REGISTRATIONS:
            return {
                ...state,
                currentRegistrations: null,
            };
        case RegistrationsActionTypes.ADD_REGISTRATION:
            return {
                ...state,
                currentRegistrations: [
                    action.payload,
                    ...state.currentRegistrations,
                ],
            };

        case RegistrationsActionTypes.REMOVE_REGISTRATION:
            return {
                ...state,
                currentRegistrations: state.currentRegistrations.filter(
                    (post) => post._id !== action.payload
                ),
            };
        case RegistrationsActionTypes.TEST_ME:
            console.log('TESTER_TESTER_TESTER\n');
            return state;

        default:
            return state;
    }
};

export default registrationsReducer;
//---------------------------------
// this would remove an entry from an array like
//
// const initialState = {
//     posts: [],
//     post: null,
//     loading: true,
//     error: {}
//   };
//===========================
// then the switch case...
// return {
//     ...state,
//     posts: [payload, ...state.posts],
//     loading: false
// };
