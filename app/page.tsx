import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
// import type { AppProps } from 'next/app';
// import '../styles/globals.css';

// export default function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

export default function Home() {
  return (
    <div className='bg-transparent'>
      <h1 className='text-5xl text-black font-serif'>Books API</h1>
      <BookForm />
      <BookList />
    </div>
  );
}
