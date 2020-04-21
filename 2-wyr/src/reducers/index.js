import { combineReducers } from 'redux';
import auth from './auth';
import questions from './questions';
import history from './history';

export default combineReducers({
  auth,
  history,
  questions,
});
