import { AsyncStorage } from 'react-native';

export const STORAGE_KEY = 'UdaciFlashcards:decks';

const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
};

export const getDecks = async () => {
  const result = await AsyncStorage.getItem(STORAGE_KEY);
  if (result !== null) {
    return JSON.parse(result);
  } else {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
};

export const getDeck = async title => {
  const decks = await getDecks();
  return decks[title];
};

export const saveDeckTitle = title => {
  const deck = { title, questions: [] };
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [title]: deck,
    })
  );
};

export const addCardToDeck = async (title, question) => {
  const decks = await getDecks();
  decks[title.title].questions.push(question);
  AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks));
};
