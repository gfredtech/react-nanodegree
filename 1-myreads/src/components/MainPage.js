import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const MainPage = ({ onUpdateBookshelf, books }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            filterBy={'currentlyReading'}
            onUpdateBookshelf={onUpdateBookshelf}
            books={books}
            title="Currently Reading"
          />
          <BookShelf
            filterBy={'wantToRead'}
            onUpdateBookshelf={onUpdateBookshelf}
            books={books}
            title="Want to Read"
          />
          <BookShelf
            filterBy={'read'}
            onUpdateBookshelf={onUpdateBookshelf}
            books={books}
            title="Read"
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button />
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
