import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
  hideLoader(loader);
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  const inputField = event.target.elements['search-text'];
  const query = inputField.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Попередження',
      message: 'Введіть пошуковий запит!',
      position: 'topRight',
    });
    return;
  }

  clearGallery(gallery);
  showLoader(loader);

  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.error({
        title: 'Помилка',
        message: 'Зображення не знайдено',
        position: 'topRight',
      });
      return;
    }
    renderGallery(images, gallery);
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити зображення',
      position: 'topRight',
    });
  } finally {
    inputField.value = '';
    hideLoader(loader);
  }
});
