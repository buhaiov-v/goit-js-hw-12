import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import error from './img/error.svg';
import { apiGetImage, addPage, resetPage } from './js/pixabay-api';
import { addLoad } from './js/render-functions';
import { iziOption } from './js/pixabay-api';



const form = document.querySelector('.form');
const addbtn = document.querySelector('.addbtn');
const input = document.querySelector('.user-input');
const load = document.querySelector('.load');



form.addEventListener('submit', (event) => {
	const gallery = document.querySelector('.gallery');

  event.preventDefault();
  const inputValue = event.target.elements.input.value.trim();
  if (!inputValue) {    
    iziToast.show({
      ...iziOption,
      message: 'Please enter the search query'
    })
    return;
  }
  gallery.innerHTML = ''
  resetPage();
  addLoad(load);
  apiGetImage(inputValue);
})

addbtn.addEventListener('click', (event) => {
  const inputValue = input.value.trim();
  addPage();
  addLoad(load);
  apiGetImage(inputValue);
})
