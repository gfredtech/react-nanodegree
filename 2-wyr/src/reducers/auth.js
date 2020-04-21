import { GET_USER, GET_USERS, LOGIN, LOGOUT } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
  allUsers: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case GET_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    case GET_USERS:
      return {
        ...state,
        allUsers: Object.keys(payload).map(id => payload[id]),
      };

    default:
      return state;
  }
}
