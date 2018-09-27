import { LOGIN_SUCCESS } from '../constants';

export const userReducer = (state = '', action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    console.log(action)
      return {
        ...state,
        ...action.user
      };
    default:
      return state;
  }
}