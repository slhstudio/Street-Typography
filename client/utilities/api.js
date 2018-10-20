import axios from 'axios';

export async function isSignedIn (error) {
  const result = await axios.get('/user')
    .catch(error);
  return result.data;
}

