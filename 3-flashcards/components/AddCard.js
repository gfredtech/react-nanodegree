import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { gray, light, dark } from '../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { addNewCard } from '../actions';
import Constants from 'expo-constants';

const AddCard = ({ addNewCard, navigation }) => {
  const deck = navigation.state.params.deck;

  const [goBack, setGoBack] = useState(false);
  const [card, setCard] = useState({
    question: '',
    answer: '',
  });

  useEffect(() => {
    if (goBack) {
      navigation.goBack();
    }
  }, [goBack]);

  const handleQuestionChange = input => {
    setCard(card => ({ ...card, question: input }));
  };

  const handleAnswerChange = input => {
    setCard(card => ({ ...card, answer: input }));
  };

  const handleSubmit = () => {
    const { question, answer } = card;
    addNewCard(deck, { question, answer });

    setCard({
      question: '',
      answer: '',
    });
    setGoBack(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Add a new card</Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            onChangeText={handleQuestionChange}
            placeholder="Enter Question"
            style={styles.input}
          />
          {card.question.length === 0 && (
            <Text>This card must have a question</Text>
          )}
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            onChangeText={handleAnswerChange}
            placeholder="Enter Answer"
            style={styles.input}
          />
          {card.answer.length === 0 && (
            <Text>This card must have an answer</Text>
          )}
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

AddCard.navigationOptions = {
  title: 'Add Card',
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: light,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  primaryBtn: {
    backgroundColor: dark,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 7,
    width: width - 40,
    marginTop: 10,
    marginBottom: 10,
  },
  secondaryBtn: {
    backgroundColor: light,
    borderColor: dark,
    borderWidth: 3,
  },
  btnText: {
    color: light,
    textAlign: 'center',
    fontSize: 21,
  },
  secondaryText: {
    color: dark,
    textAlign: 'center',
    fontSize: 21,
  },
  input: {
    padding: 20,
    marginTop: 10,
    marginBottom: 25,
    fontSize: 18,
    borderWidth: 2,
    borderColor: gray,
    borderRadius: 8,
    width: width - 40,
    textAlign: 'center',
  },
});

const mapStateToProps = decks => ({
  decks,
});

export default connect(mapStateToProps, { addNewCard })(AddCard);
