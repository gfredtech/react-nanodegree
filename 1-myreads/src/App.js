import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import BookSearch from './components/BookSearch';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.onLoadBookshelf();
  }

  onLoadBookshelf = async () => {
    this.setState({
      ...this.state,
      books: await BooksAPI.getAll(),
    });
  };

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <MainPage
                books={this.state.books}
                onUpdateBookshelf={this.onLoadBookshelf}
              />
            </Route>
            <Route exact path="/search">
              <BookSearch
                shelf={this.state.books}
                searchResults={this.state.searchResults}
                onUpdateBookshelf={this.onLoadBookshelf}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
