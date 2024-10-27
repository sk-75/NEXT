import { useRouter } from 'next/router';
import fs from 'fs/promises';
import path from 'path';
import Link from "next/link";

export default function BookDetail(props) {
  const router = useRouter();

  // Fallback handling for paths that don't exist or are still loading
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{props.book.title}</h1>
      <ol >

       <Link href={"/bookdetails/" + props.book.id +"/"+props.author.name}>View Author Details</Link>
        <p><strong>Genre:</strong> {props.genre.name}</p>
        <p><strong>Rating:</strong> {props.book.rating}</p>
        <p><strong>Description:</strong> {props.book.description}</p>
        <p><strong>Price:</strong> {props.book.price}</p>

      </ol>
      
    </div>
  );
}

// Generate paths for each book based on its ID
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // Create paths for each book using its ID
  const paths = data.books.map((book) => ({
    params: { id: book.id }
  }));

  return {
    paths,
    fallback: true // Enable fallback rendering for paths not yet generated
  };
}

// Fetch book data based on the ID parameter
export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // Find the book matching the given ID
  const book = data.books.find((book) => book.id === context.params.id);
  const genreid = book.genreId 
  const genre = data.genres.find((genre)=>genre.id === genreid)
  const authorid = book.authorId 
  const author = data.authors.find((author)=>author.id === authorid) 
  if (!book) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      book:book,
      genre:genre,
      author:author
    },
    revalidate:60
  };
}
