import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { gray, white, dark, light, green, red } from '../utils/colors';
import Constants from 'expo-constants';

const Quiz = ({ deck, navigation }) => {
  const [quiz, setQuiz] = useState({
    total: 0,
    correct: 0,
    wrong: 0,
    showingQuestion: true,
    currentQuestion: 0,
  });

  const question = deck.questions[quiz.currentQuestion];

  const resetQuiz = () => {
    setQuiz({
      total: 0,
      correct: 0,
      wrong: 0,
      showingQuestion: true,
      currentQuestion: 0,
    });
  };

  const handleAnswer = (question, isCorrect) => {
    setQuiz(quiz => ({
      ...quiz,
      total: quiz.total + 1,
      showingQuestion: true,
      currentQuestion: quiz.currentQuestion + 1,
      correct: isCorrect ? quiz.correct + 1 : quiz.correct,
      wrong: !isCorrect ? quiz.wrong + 1 : quiz.wrong,
    }));
  };

  if (deck.questions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.heading}>There are no cards for this Deck</Text>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate('AddCard', { deck })}
          >
            <Text style={{ textAlign: 'center', fontSize: 18, color: dark }}>
              Add New Card to Deck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (quiz.total === deck.questions.length) {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.section}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                marginBottom: 10,
                color: dark,
              }}
            >
              Total of correct questions: {quiz.correct}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                marginBottom: 10,
                color: dark,
              }}
            >
              Total of wrong questions: {quiz.wrong}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.correctBtn, styles.primaryBtn]}
              onPress={resetQuiz}
            >
              <Text style={styles.btnText}>Reset Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.correctBtn, styles.primaryBtn]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.btnText}>Go back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.heading}>{deck.title}</Text>
        <View>
          <Text style={{ fontSize: 18, color: gray, textAlign: 'center' }}>
            Card {quiz.currentQuestion + 1} of {deck.questions.length}
          </Text>
        </View>
      </View>
      <View>
        {quiz.showingQuestion === true ? (
          <View style={styles.section}>
            <Text style={{ fontSize: 18, color: gray, marginBottom: 10 }}>
              Question:
            </Text>
            <Text style={styles.question}>{question.question}</Text>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={{ fontSize: 18, color: gray }}>Answer:</Text>
            <Text style={styles.question}>{question.answer}</Text>
          </View>
        )}
      </View>
      <View style={styles.section}>
        <TouchableWithoutFeedback
          onPress={() =>
            setQuiz(quiz => ({
              ...quiz,
              showingQuestion: !quiz.showingQuestion,
            }))
          }
        >
          <Text>
            {quiz.showingQuestion === true ? 'Show Answer' : 'Show Question'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.correctBtn}
          onPress={() => handleAnswer(question, true)}
        >
          <Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.correctBtn, styles.wrongBtn]}
          onPress={() => handleAnswer(question, false)}
        >
          <Text style={styles.secondaryText}>Wrong</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
  section: {
    textAlign: 'center',
    padding: 20,
  },
  question: {
    fontSize: 32,
    color: dark,
  },
  heading: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  correctBtn: {
    backgroundColor: green,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 7,
    width: width - 40,
    marginTop: 10,
    marginBottom: 10,
  },
  wrongBtn: {
    backgroundColor: red,
  },
  primaryBtn: {
    backgroundColor: dark,
  },
  secondaryBtn: {
    backgroundColor: light,
    borderWidth: 2,
    borderColor: dark,
  },
  btnText: {
    color: white,
    textAlign: 'center',
    fontSize: 21,
  },
  secondaryText: {
    color: light,
    textAlign: 'center',
    fontSize: 21,
  },
});

Quiz.navigationOptions = {
  title: 'Quiz',
};

const mapStateToProps = (state, { navigation }) => ({
  deck: navigation.state.params.deck,
});

export default connect(mapStateToProps)(Quiz);
