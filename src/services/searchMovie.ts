import { MovieCardProps } from "types/MovieCard/MovieCardType";

const apiKey = import.meta.env.VITE_SOME_KEY;

const searchMovie = async(movie_title: string): Promise<MovieCardProps[]> => {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie_title}&api_key=${apiKey}`)
  const data = await res.json()

  return data?.results;
}

export default searchMovie;