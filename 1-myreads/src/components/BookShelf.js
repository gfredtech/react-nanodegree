import BookList from './BookList';
import React from 'react';

const BookShelf = ({ books, onUpdateBookshelf, title, filterBy }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <BookList
        shelf={books}
        onUpdateBookshelf={onUpdateBookshelf}
        books={books.filter(book => book.shelf === filterBy)}
      />
    </div>
  </div>
);

export default BookShelf;
