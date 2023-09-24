import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_ZYnJQSNdio8Z0g8vIHgyxV2sdScmGCBblNKdbL45jhN0TU8nuQCLAIOUqLmlIpbx';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(() => {
      return Notiflix.Report.failure(
        'Error',
        'Oops! Something went wrong! Try reloading the page!',
        'OK'
      );
    });
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data[0];
    })
    .catch(() => {
      return Notiflix.Report.failure(
        'Error',
        'Oops! Something went wrong! Try reloading the page!',
        'OK'
      );
    });
}
