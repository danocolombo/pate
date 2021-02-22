import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});
// export const loadUser = user => ({
//   type: UserActionTypes.LOGIN_SUCCESS,
//   payload: user
// });
