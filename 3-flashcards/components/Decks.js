import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllDecks } from '../actions';
import { AppLoading } from 'expo';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import { dark, light } from '../utils/colors';
import Deck from './Deck';

const Decks = ({ decks, getAllDecks, navigation }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => await getAllDecks())();
    setReady(true);
  }, []);

  const navigateToDeckDetail = deck => {
    navigation.navigate('DeckDetail', { deck });
  };

  if (!ready || decks === null || decks === undefined) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.values(decks)}
        renderItem={({ item }) => (
          <Deck
            style={styles.deck}
            title={item.title}
            deck={decks[item.title]}
            navigateToDeckDetail={navigateToDeckDetail}
          />
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('AddDeck')}
        >
          <Text style={styles.btnText}>Add New Deck</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: light,
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
});

Decks.navigationOptions = {
  title: 'Welcome',
};

const mapStateToProps = decks => ({
  decks,
});

export default connect(mapStateToProps, { getAllDecks })(Decks);
