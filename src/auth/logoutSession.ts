interface DeleteResponse {
  status_message: string;
  success: boolean;
  status_code: number
}

const accessKey = import.meta.env.VITE_ACCESS_KEY;

const logoutSession = async(access_token: string): Promise<DeleteResponse> => {
  const res = await fetch(`https://api.themoviedb.org/4/auth/access_token`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${accessKey}`
    },
    body: JSON.stringify({
      access_token: access_token
    }),
  })

  const data = await res?.json();
  console.log('data logout', data)
  return data;
}

export default logoutSession;