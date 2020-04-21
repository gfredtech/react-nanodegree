import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AppNavigation from './components';
import rootReducer from './reducers';
import { setNotification } from './utils/notification';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  useEffect(() => {
    // set Notification
    setNotification();
  }, []);

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AppNavigation />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
