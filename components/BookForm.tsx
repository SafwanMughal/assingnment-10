"use client"
import { useState } from 'react';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const addBook = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, year: parseInt(year) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle('');
        setAuthor('');
        setYear('');
        console.log('Book added:', data);
      });
  };

  return (
    <form className='text-center' onSubmit={addBook}>
      <h2 className='text-black text-3xl'>Add Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
