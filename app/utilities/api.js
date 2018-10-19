import axios from 'axios';

const api = {}

api.isSignedIn = async (error) => {
  const result = await axios.get('/user')
    .catch(error);
  return result.data;
}

module.exports = api;