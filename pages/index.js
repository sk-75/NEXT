
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link' ;

export default function Home(props) {
  const router = useRouter();

  // Handle navigation to genres page
  const handleViewGenres = (genreId) => {
    router.push('/genre/'+ genreId); // Programmatic navigation
  };
 
  return (
    <div>
      
      <h1>Featured Books</h1>
      <div>
        {props.featuredBooks.map((book) => (
          <div key={book.id} >
            <ol>
              <Link href={"/bookdetails/" + book.id}>{book.title }</Link>
              <button onClick={()=>handleViewGenres(book.genreId)}>View Genres</button>
            </ol>
            
          </div>
        ))}
      </div>
      <br></br>
      <br></br>
      <div>
        <ul>
          <li>
            <Link href="/info/info ">
              Info Page
            </Link>
          </li>
          <li>
            <Link href="/info/faqs">
              FAQs
            </Link>
          </li>
          <li>
            <Link href="/info/support">
              Support
            </Link>
          </li>
          <li>
            <Link href="/info/custom/page">
               Custom 404 Error Page
            </Link>
          </li>
        </ul>
     </div>
      
    </div>
  );
}

// Function to read the JSON data
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const books = data.books
  // const genre = data.genre
  if (!data) {
    return { notFound: true };
  }


  return {
    props: {
      featuredBooks: books
      // genre : genre
    },
    revalidate : 60
  };
}
