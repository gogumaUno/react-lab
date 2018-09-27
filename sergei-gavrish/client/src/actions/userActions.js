import { LOGIN_SUCCESS } from '../constants';

export const userLogin = user => ({
  type: LOGIN_SUCCESS,
  user
});
