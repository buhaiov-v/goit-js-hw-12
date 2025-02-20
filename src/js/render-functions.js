import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { iziOption } from './pixabay-api';


const gallery = document.querySelector('.gallery');
const addbtn = document.querySelector('.addbtn');
const load = document.querySelector('.load');

export function addLoad(elem) {
    elem.insertAdjacentHTML(
        'beforeend',
        '<p class="loading">Wait, the image is loaded</p><span class="loader"></span>')
  addbtn.classList.add('hidden');
};
export function removeLoad(elem) {
  elem.innerHTML = '';
    addbtn.classList.remove('hidden');

};

export function markup(data) {
    let { hits } = data;
    if (hits.length === 0) {
        iziToast.show({
      ...iziOption,
      message:
        'Sorry, there are no images matching your search query. Please, try again!',
    });

    return;
    }
    const markup = hits.map(image =>
        
        `
        <li class='gallery__item'>
        <a class='gallery__link' href="${image.largeImageURL}">
        <img class='gallery__img' src="${image.webformatURL}" alt="${image.tags}" />
          <div class="grid">
            <p>Likes</p>
            <p>Views</p>
            <p>Comment</p>
            <p>Downloads</p>
            <span>${image.likes}</span>
            <span>${image.views}</span>
            <span>${image.comments}</span>
            <span>${image.downloads}</span>
          </div>
        </a>
      </li>`
    ).join(' ')
    removeLoad(load)
    gallery.insertAdjacentHTML('beforeend', markup);

    const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    })
  lightbox.refresh();
};

