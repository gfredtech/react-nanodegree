import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Decks from './Decks';
import DeckDetail from './DeckDetail';
import AddDeck from './AddDeck';
import AddCard from './AddCard';
import Deck from './Deck';
import Quiz from './Quiz';
import { light, lightPurple } from '../utils/colors';

const AppNavigation = createStackNavigator(
  {
    Decks: {
      screen: Decks,
    },
    DeckDetail: {
      screen: DeckDetail,
    },

    AddCard: {
      screen: AddCard,
    },

    AddDeck: {
      screen: AddDeck,
    },

    Deck: {
      screen: Deck,
    },
    Quiz: {
      screen: Quiz,
    },
  },
  {
    initialRouteName: 'Decks',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: lightPurple,
        height: 80,
      },
      headerTintColor: light,
      headerTitleStyle: 'bold',
      headerBackTitle: 'back',
    },
  }
);

export default createAppContainer(AppNavigation);
