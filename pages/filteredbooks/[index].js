import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function filteredbooks() {
  const router = useRouter();
   const genreId = router.query.index
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
      // Fetch data.json from public folder
      fetch('/data.json')
        .then((response) => response.json())
        .then((data) => setBooks(data.books))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

  console.log(genreId)
  return (
    <div>
      
      <h1>Filtered Books by Genre</h1>
      <div>
        {
            books.map((book)=>{
               return book.genreId === genreId && <li>{book.title}</li>
            })
      
        }
      </div>
    </div>
    )
}