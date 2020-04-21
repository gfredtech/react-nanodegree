import {
  GET_QUESTIONS,
  SAVE_QUESTION,
  SAVE_QUESTION_ANSWER,
} from '../actions/types';
const initialState = {
  questions: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_QUESTIONS:
    case SAVE_QUESTION_ANSWER:
    case SAVE_QUESTION:
      return {
        ...state,
        questions: Object.keys(payload).map(id => payload[id]),
      };

    default:
      return state;
  }
}
