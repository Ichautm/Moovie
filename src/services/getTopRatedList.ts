import { MovieCardProps } from "types/MovieCard/MovieCardType";

const apiKey = import.meta.env.VITE_SOME_KEY;

const getTopRatedList = async(): Promise<MovieCardProps[]> => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
  const data = await res.json()
  
  return data?.results;
}

export default getTopRatedList;