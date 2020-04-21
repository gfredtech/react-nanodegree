import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { dark, gray, light } from '../utils/colors';
import Constants from 'expo-constants';
import { AppLoading } from 'expo';
import { clearNotification, setNotification } from '../utils/notification';

const DeckDetail = ({ deck, navigation }) => {
  const handleQuiz = () => {
    clearNotification()
      .then(setNotification)
      .then(navigation.navigate('Quiz', { deck }));
  };

  if (deck === undefined) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text
          style={{
            fontSize: 32,
            marginTop: 10,
            marginBottom: 5,
            textAlign: 'center',
          }}
        >
          {deck.title}
        </Text>
        <Text style={{ color: gray, fontSize: 18, textAlign: 'center' }}>
          {deck.questions.length} cards
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleQuiz}>
          <Text style={styles.btnText}>Take A Quiz</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.primaryBtn, styles.secondaryBtn]}
          onPress={() => navigation.navigate('AddCard', { deck })}
        >
          <Text style={styles.secondaryText}>Add A Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

DeckDetail.navigationOptions = {
  title: 'Deck Detail',
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
    marginBottom: 20,
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
});

const mapStateToProps = (state, ownProps) => ({
  deck: state[ownProps.navigation.state.params.deck],
});

export default connect(mapStateToProps)(DeckDetail);
