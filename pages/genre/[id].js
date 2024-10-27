import { useRouter } from 'next/router';
import fs from 'fs/promises';
import path from 'path';
import Link from "next/link"

export default function GenrePage(props) {
  const router = useRouter();
  
  // Fallback handling for paths that don't exist
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
      <Link href={"/filteredbooks/"+props.genre.id}><strong>{props.genre.name}</strong></Link>
    </div>
  );
}

// Generate paths for genres dynamically
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const paths = data.genres.map((genre) => ({
    params: { id: genre.id }
  }));

  return {
    paths,
    fallback: true // Enable fallback to handle non-predefined paths
  };
}

// Fetch genre data based on ID
export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const genre = data.genres.find((g) => g.id === context.params.id);

  if (!genre) {
    return { notFound: true };
  }

  return {
    props: {
      genre
    }
  };
}


// export async function getServerSideProps(context){

//   const filePath = path.join(process.cwd(), 'data', 'data.json');
//   const jsonData = await fs.readFile(filePath);
//   const data = JSON.parse(jsonData);
//   const genre = data.genres.find((g) => g.id === context.params.id);
  
//   return{
//       props:{
//           genre:genre
//       }
//   }
// }
