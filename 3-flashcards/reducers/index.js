import { ADD_NEW_CARD, ADD_NEW_DECK, GET_ALL_DECKS } from '../actions/types';

export default function(state = {}, action) {
  const { type } = action;

  switch (type) {
    case GET_ALL_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_NEW_DECK:
      const title = action.title;
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };
    case ADD_NEW_CARD:
      const { deck, card } = action;
      const deckTitle = deck.title;
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: [...state[deckTitle].questions].concat(card),
        },
      };
  }
}
