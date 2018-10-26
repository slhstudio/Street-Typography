import axios from 'axios';

export async function isSignedIn (error) {
  const result = await axios.get('/user')
    .catch(error);
  return result.data;
}

export async function findAllPhotos (error) {
  const result = await axios.get('/findAllPhotos')
    .catch(error);
  return result;
}

