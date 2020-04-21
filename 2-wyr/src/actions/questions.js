import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from '../utils/_DATA';
import { GET_QUESTIONS } from './types';

export const fetchQuestions = () => async dispatch => {
  const res = await _getQuestions();
  dispatch({
    type: GET_QUESTIONS,
    payload: res,
  });
};

export const saveQuestion = question => async dispatch => {
  await _saveQuestion(question);
  await fetchQuestions()(dispatch);
};

export const saveQuestionAnswer = ({
  authedUser,
  qid,
  answer,
}) => async dispatch => {
  await _saveQuestionAnswer({ authedUser, qid, answer });
  await fetchQuestions()(dispatch);
};
