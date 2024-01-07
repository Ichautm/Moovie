import { MovieCardProps } from "types/MovieCard/MovieCardType";

interface AddWatchlistResponse {
  status_code: number;
  status_message: string;
}

const account_id = import.meta.env.VITE_ACCOUNT_ID;
const accessKey = import.meta.env.VITE_ACCESS_KEY;

export const addWatchList = async(media_id: number, isWatchlist: boolean): Promise<AddWatchlistResponse> => {
  const res = await fetch(`https://api.themoviedb.org/3/account/${account_id}/watchlist`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${accessKey}`
    },
    body: JSON.stringify({
      media_type: 'movie', 
      media_id: media_id,
      watchlist: isWatchlist
    })
  })

  const data = await res?.json()

  return data;
}

export const getWatchList = async(): Promise<MovieCardProps[]> => {
  const res = await fetch(`https://api.themoviedb.org/3/account/${account_id}/watchlist/movies`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessKey}`
    }
  })
  const data = await res?.json()

  return data.results;
}