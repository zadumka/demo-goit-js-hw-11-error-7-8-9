import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api';

import 'izitoast/dist/css/iziToast.min.css';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const formElInput = document.querySelector('.form button');

function handleSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));

  if (data.message === '') {
    return;
  }

  showLoader();
  clearGallery();

  getImagesByQuery(data.message)
    .then(({ hits: results }) => {
      if (results.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      createGallery(results);
    })
     .catch(err => {
      iziToast.error({
        message: 'Error!!!',
      });
    })
    
}

form.addEventListener('submit', handleSubmit);
formElInput.addEventListener('input', handleSubmit);
