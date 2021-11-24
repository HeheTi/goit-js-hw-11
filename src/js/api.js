const axios = require('axios');

export default class ApiPictureConstructor {
  #API_KEY = '24468918-f1629215ca3337ba51b4044a7';
  BASE_URL = 'https://pixabay.com/api/';
  #searchInfo = '';
  #page = 1;
  #PER_PAGE = 40;

  constructor() {
    this.#searchInfo = '';
  }

  async fetchPicture() {
    const URL = this.getURL();
    const fetchData = await axios.get(URL);
    const pictures = await fetchData.data;
    return pictures;
  }

  getURL() {
    const queryParams = new URLSearchParams({
      key: this.#API_KEY,
      q: `${this.searchInfo}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: `${this.page}`,
      per_page: `${this.perPage}`,
    });

    return `${this.BASE_URL}?${queryParams}`;
  }

  incrementPage() {
    this.#page += 1;
  }

  get page() {
    return this.#page;
  }

  resetPage() {
    this.#page = 1;
  }

  get perPage() {
    return this.#PER_PAGE;
  }
  get searchInfo() {
    return this.#searchInfo;
  }

  set searchInfo(value) {
    this.#searchInfo = value;
  }
}
