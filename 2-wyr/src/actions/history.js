import { SET_HISTORY } from './types';

export const saveLastVisitedPage = location => async dispatch => {
  await dispatch({
    type: SET_HISTORY,
    payload: location,
  });
};
