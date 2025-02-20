import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from "axios";
import error from '../img/error.svg';
import { markup } from '/js/render-functions';
import { removeLoad } from '/js/render-functions';



let page = 1;
const perPage = 40;
const load = document.querySelector('.load');
const addbtn = document.querySelector('.addbtn');
const gallery = document.querySelector('.gallery');

export const iziOption = {
  messageColor: '#FAFAFB',
  messageSize: '16px',
  backgroundColor: '#EF4040',
  iconUrl: error,
  transitionIn: 'bounceInLeft',
  position: 'topRight',
  displayMode: 'replace',
  closeOnClick: true,
};

export function addPage() { 
    page += 1;
};

export function resetPage() {
    page = 1;
}

function endList(load) {
    removeLoad(load);
    load.insertAdjacentHTML('beforeend', 'We\'re sorry, but you\'ve reached the end of search results.');
    addbtn.classList.add('hidden');
}

export async function apiGetImage(inputValue) {
	const API_KEY = '48874141-41096ced0124b4255d05d38ce';
	const URL = 'https://pixabay.com/api/';
	const params = {
		key: API_KEY,
		q: inputValue,
		image_type: 'photo',
		orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: perPage,
	}
	try {
        const image = await axios.get(URL, { params });
        markup(image.data);
        if (image.data.totalHits < page * perPage) {
            endList(load)
            return
        }
        if (page >= 2) {
            const list = document.querySelector('.gallery__item');
            const rect = list.getBoundingClientRect();
            window.scrollBy({
                top: rect.height * 3,
                behavior: 'smooth',
            })
        }
		
	}
    catch (error) {
        gallery.innerHTML = '';
          iziToast.show({
      ...iziOption,
      message: 'Sorry, an error happened. Try again',
    });
    }
}

