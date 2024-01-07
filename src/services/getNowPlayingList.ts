import { MovieCardProps }from '../../types/MovieCard/MovieCardType'

const apiKey = import.meta.env.VITE_SOME_KEY;

const getNowPlayingList = async(): Promise<MovieCardProps[]> => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
  const data = await res.json()
  return data.results;
}

export default getNowPlayingList;