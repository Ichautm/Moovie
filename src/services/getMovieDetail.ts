export interface MovieDetail {
  id: number;
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  release_date: string;
  runtime: number;
  vote_average: number;
  overview: string;
  title: string;
  poster_path: string;
}

const apiKey = import.meta.env.VITE_SOME_KEY;

const getMovieDetail = async(movie_id: number): Promise<MovieDetail> => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`);
  const data = await res?.json()

  return data;
}

export default getMovieDetail;