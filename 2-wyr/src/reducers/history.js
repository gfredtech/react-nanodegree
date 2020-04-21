import { SET_HISTORY, CLEAR_HISTORY } from '../actions/types';

const initialState = {
  history: '',
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_HISTORY:
      return {
        ...state,
        history: payload,
      };
    case CLEAR_HISTORY:
      return {
        ...state,
        history: '',
      };
    default:
      return state;
  }
}
