"use client"
import { useState } from 'react';
import styles from './BookList.module.css';

type Book = {
  id: string;
  title: string;
  author: string;
  year: string;
};

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>('fiction');

  const fetchBooks = (searchQuery: string) => {
    fetch(`/api/books?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(query);
  };

  return (
    <div className={styles.container}>
      <h2>Book List</h2>
      <form onSubmit={handleSearch} className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul className={styles.bookList}>
        {books.map((book) => (
          <li key={book.id} className={styles.bookItem}>
            <div>
              <strong>{book.title}</strong> by {book.author} ({book.year})
            </div>
            <button>Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
