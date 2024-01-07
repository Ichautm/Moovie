import { MovieCardProps } from "types/MovieCard/MovieCardType";

interface AddFavoriteResponse {
  status_code: number;
  status_message: string;
}

const account_id = import.meta.env.VITE_ACCOUNT_ID;
const accessKey = import.meta.env.VITE_ACCESS_KEY;

export const addFavorite = async(media_id: number, isFavorite: boolean): Promise<AddFavoriteResponse> => {
  const res = await fetch(`https://api.themoviedb.org/3/account/${account_id}/favorite`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${accessKey}`
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: media_id,
      favorite: isFavorite
    })
  })

  const data = await res?.json()

  return data;
}

export const getFavorite = async(): Promise<MovieCardProps[]> => {
  const res = await fetch(`https://api.themoviedb.org/3/account/${account_id}/favorite/movies`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessKey}`
    }
  })
  const data = await res?.json()

  return data.results;
}
