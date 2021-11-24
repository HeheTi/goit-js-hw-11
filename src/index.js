import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './sass/main.scss';
import refs from './js/refs.js';
import ApiPictureConstructor from './js/api.js';
import { renderMarkupPic } from './js/markup.js';

const picturesApi = new ApiPictureConstructor();

const gallery = new SimpleLightbox('.gallery a', {
  animationSpeed: 300,
});

const FAILURE = 'Sorry, there are no images matching your search query. Please try again.';
const INFO = "We're sorry, but you've reached the end of search results.";
const resultMessage = info => `Hooray! We found ${info} images.`;

function onSearchPicture(e) {
  e.preventDefault();

  picturesApi.searchInfo = e.currentTarget.elements.searchQuery.value;

  upGradePage();
  reset();
}

async function upGradePage() {
  try {
    const { hits, totalHits } = await picturesApi.fetchPicture();

    if (hits.length < 1) {
      return Notify.failure(FAILURE);
    }

    const currentPage = picturesApi.page;
    const totalPage = Math.ceil(totalHits / picturesApi.perPage);

    if (currentPage === 1) {
      Notify.success(resultMessage(totalHits));
      toggle();
    }
    renderMarkupPic(hits);
    gallery.refresh();

    if (currentPage >= totalPage) {
      Notify.info(INFO);
      toggle();
      return;
    }
    picturesApi.incrementPage();
  } catch (e) {
    Notify.failure(e.message);
  }
}

function reset() {
  refs.gallery.innerHTML = '';
  picturesApi.resetPage();
}

function toggle() {
  refs.btnLoadMore.classList.toggle('is-hidden');
}

refs.form.addEventListener('submit', onSearchPicture);
refs.btnLoadMore.addEventListener('click', upGradePage);
