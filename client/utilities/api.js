import axios from 'axios';

export async function isSignedIn(error) {
  const result = await axios.get('/user').catch(error);
  return result.data;
}

export async function findAllPhotos(error) {
  const result = await axios.get('/findAllPhotos').catch(error);
  return result;
}

export async function findMine(error) {
  const result = await axios.get('/findMine').catch(error);
  return result;
}

export async function findThisPhoto(photo, error) {
  const result = await axios.get(`/findphoto/${photo}`).catch(error);
  return result.data;
}

export async function submitPhotos(data, error) {
  const add = await axios.post('/addPhoto', data).catch(error);
  console.log(add.data);
  return add.data;
}

export async function uploadChanges(update, image, error) {
  const newNotes = await axios
    .post(`/uploadChange/${image}`, { notes: update })
    .catch(error);
  return newNotes.data;
}

export async function deletePhoto(image, error) {
  const trash = await axios.delete(`/delete/${image}`).catch(error);
  return trash.data;
}

export async function findPlaces(map, lat, lng, error) {
  const places = await axios
    .get(`/locate/near?lat=${lat}&lng=${lng}`)
    .catch(error);
  return places.data;
}
