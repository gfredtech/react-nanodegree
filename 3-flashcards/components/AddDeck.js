import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { addNewDeck } from '../actions';
import { connect } from 'react-redux';
import { dark, gray, light } from '../utils/colors';
import Constants from 'expo-constants';

const AddDeck = ({ addNewDeck, navigation }) => {
  const [deckTitle, setDeckTitle] = useState('');

  const handleChange = input => {
    setDeckTitle(input);
  };

  const handleSubmit = async () => {
    await addNewDeck(deckTitle);
    setDeckTitle('');
    navigation.navigate('DeckDetail', { deck: deckTitle });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.heading}>New Deck</Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          marginBottom: 10,
          color: dark,
        }}
      >
        Add the title of the new deck you want to create
      </Text>
      <TextInput
        onChangeText={handleChange}
        placeholder="Deck Name"
        style={styles.input}
      />
      {deckTitle.length === 0 ? <Text>Deck must have a title</Text> : <Text />}
      <TouchableOpacity style={styles.primaryBtn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Add Deck</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

AddDeck.navigationOptions = {
  title: 'Add Deck',
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
    fontSize: 32,
    textAlign: 'center',
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
  btnText: {
    color: light,
    textAlign: 'center',
    fontSize: 21,
  },
  input: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    borderWidth: 2,
    borderColor: gray,
    borderRadius: 8,
    width: width - 40,
    textAlign: 'center',
  },
});

export default connect(null, { addNewDeck })(AddDeck);
