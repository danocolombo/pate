import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import alertReducer from './alert/alert.reducer';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['cart']
// };

const rootReducer = combineReducers({
    user: userReducer,
    alert: alertReducer,
    
});

export default rootReducer;
