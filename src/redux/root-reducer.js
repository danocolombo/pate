import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import registrationsReducer from './registrations/registrations.reducer';
import pateReducer from './pate/pate.reducer';
import stateRepReducer from './stateRep/stateRep.reducer';
import stateLeadReducer from './stateLead/stateLead.reducer';
import alertReducer from './alert/alert.reducer';
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['cart']
// };

const rootReducer = combineReducers({
    user: userReducer,
    registrations: registrationsReducer,
    pate: pateReducer,
    stateRep: stateRepReducer,
    stateLead: stateLeadReducer,
    alert: alertReducer,
});

export default rootReducer;
