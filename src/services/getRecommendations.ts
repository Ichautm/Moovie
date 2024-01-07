import { MovieCardProps } from "types/MovieCard/MovieCardType";

const apiKey = import.meta.env.VITE_SOME_KEY;

const getRecommendation = async(movie_id: number): Promise<MovieCardProps[]> => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${apiKey}`)
  const data = await res.json()
  return data.results;
}

export default getRecommendation;