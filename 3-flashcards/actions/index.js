import { getDecks, addCardToDeck, saveDeckTitle } from '../utils/api';
import { ADD_NEW_CARD, ADD_NEW_DECK, GET_ALL_DECKS } from './types';

export const getAllDecks = () => async dispatch => {
  const decks = await getDecks();
  dispatch({
    type: GET_ALL_DECKS,
    decks,
  });
};

export const addNewDeck = title => async dispatch => {
  await saveDeckTitle(title);
  dispatch({
    type: ADD_NEW_DECK,
    title,
  });
  await getAllDecks()(dispatch);
};

export const addNewCard = (title, question) => async dispatch => {
  await addCardToDeck(title, question);
  dispatch({
    type: ADD_NEW_CARD,
    deck: title,
    card: question,
  });
  await getAllDecks()(dispatch);
};
