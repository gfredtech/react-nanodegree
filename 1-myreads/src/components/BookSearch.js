import React from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';
import * as BooksAPI from '../BooksAPI';
import { debounce } from 'throttle-debounce';

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
    this.searchBook = debounce(600, this.searchBook);
  }

  async searchBook(value) {
    this.setState({ searchResults: await BooksAPI.search(value) });
  }

  handleChange = async ({ target: { value } }) => {
    this.searchBook(value);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">CLose</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookList
            shelf={this.props.shelf}
            onUpdateBookshelf={this.props.onUpdateBookshelf}
            books={this.state.searchResults}
          />
        </div>
      </div>
    );
  }
}

export default BookSearch;
