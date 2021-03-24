import { RegistrationsActionTypes } from './registrations.types';

const INITIAL_STATE = {
    registration: null,
    confirmed: [],
    loading: false,
    count: 0,
    error: {},
};

const registrationsReducer = (state = INITIAL_STATE, action) => {
    console.log('____________IN REDUCER: ' + action.type);
    switch (action.type) {
        case RegistrationsActionTypes.LOAD_REGISTRATIONS:
            return {
                ...state,
                confirmed: action.payload,
            };
        case RegistrationsActionTypes.CLEAR_REGISTRATIONS:
            return {
                ...state,
                confirmed: null,
            };
        case RegistrationsActionTypes.ADD_REGISTRATION:
            // return {
            //     ...state,
            //     posts: [payload, ...state.posts],
            //     loading: false,
            // };
            return {
                ...state,
                confirmed: [action.payload, ...state.confirmed],
                count: state.count + 1,
            };
        // case RegistrationsActionTypes.REMOVE_REGISTRATION:
        //     return {
        //         ...state,
        //         confirmed: state.confirmed.filter(
        //             (post) => post._id !== action.payload
        //         ),
        //     };
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
