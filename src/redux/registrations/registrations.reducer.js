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
            // this is not tested, this was copied from 
            // Traversy project dev_connector2.0
            return {
                state,
            }
            
            case RegistrationsActionTypes.REMOVE_REGISTRATION:
                // this is not tested, this was copied from 
                // Traversy project dev_connector2.0
                return {
                    state,
                }
                
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

            