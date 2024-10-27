
// export default function AuthorInfo(props) {


//   return (
//     <div>
//       <h1> Author Name :  </h1>
//       <h2>{props.name}</h2>
//     </div>
//   );
// }


// export async function getServerSideProps(context){

//   return{
//       props:{
//           name:context.params.author
//       }
//   }
// }


import useSWR from 'swr';
import { useRouter } from 'next/router';
// Fetcher function to get data from the API




export default function Authors() {
  const router = useRouter();
  const authorId = router.query.author;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  // Using useSWR hook to fetch the list of authors from the API
  const { data, error } = useSWR('/data.json', fetcher);

  if (error) return <div>Failed to load authors</div>;
  if (!data) return <div>Loading...</div>;
   const authors = data.authors;
   const getAuthor= authors.find((a)=>a.name === authorId)
  return (
    <div>
      <h1>Author Name</h1>
      <h1>
        {
           getAuthor.name
        }
      </h1>

  
    </div>
  );
}


