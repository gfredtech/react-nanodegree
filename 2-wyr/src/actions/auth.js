import { GET_USERS, LOGIN, LOGOUT } from './types';
import { _getUsers } from '../utils/_DATA';

export const loginUser = id => async dispatch => {
  const user = await _getUsers();
  dispatch({
    type: LOGIN,
    payload: user[id],
  });
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};
export const getUsers = () => async dispatch => {
  const users = await _getUsers();
  dispatch({
    type: GET_USERS,
    payload: users,
  });
};
