interface RequestResponse {
  account_id: string;
  access_token: string;
  success: boolean;
  status_message: string;
  status_code: number;
}

const accessKey = import.meta.env.VITE_ACCESS_KEY;

const createAccessToken = async(request_token: string): Promise<RequestResponse> => {
  const res = await fetch(`https://api.themoviedb.org/4/auth/access_token`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${accessKey}`
    },
    body: JSON.stringify({
      request_token: request_token
    }),
  })

  const data = await res?.json()
  return data
}

export default createAccessToken;