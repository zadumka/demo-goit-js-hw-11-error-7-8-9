import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31000801-179358ed9db1a9fc0904af43d';

export function getImagesByQuery(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: query,
  });

  return axios(`${BASE_URL}?${params}`)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error.message);
      throw error;
    });
}
