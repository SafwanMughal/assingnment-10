import { NextApiRequest, NextApiResponse } from 'next';

// Book type definition
type Book = {
  id: string;
  title: string;
  author: string;
  year: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const searchQuery = query.q || 'fiction';

  switch (method) {
    case 'GET':
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
        );
        const data = await response.json();

        // Map API response to our Book type
        const books: Book[] = data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
          year: item.volumeInfo.publishedDate || 'N/A',
        }));

        res.status(200).json(books);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching books' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
