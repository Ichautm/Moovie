interface RequestResponse {
  request_token: string;
  status_code: number;
  status_message: string;
  success: boolean
}

const accessKey = import.meta.env.VITE_ACCESS_KEY;

const createRequestToken = async(): Promise<RequestResponse> => {
  const res = await fetch(`https://api.themoviedb.org/4/auth/request_token`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${accessKey}`
    },
    body: JSON.stringify({
      redirect_to: `http://localhost:5173/?approved=true`,
    })
  })

  const data = await res?.json();
  return data
}

export default createRequestToken;