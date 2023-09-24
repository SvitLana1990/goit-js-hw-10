import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import refs from './refs';

const { breedSelect, loader, error, catInfo } = refs;

loader.textContent = '';
loader.classList.add('is-hidden');
error.textContent = '';

fetchBreeds()
  .then(breedsArray => {
    const dataProvider = breedsArray.map(({ id, name }) => {
      return { value: id, text: name };
    });

    dataProvider.unshift({
      value: '',
      text: 'Select breed',
      disabled: true,
    });

    new SlimSelect({
      select: breedSelect,
      data: dataProvider,
    });
  })
  .catch(onFetchError);

breedSelect.addEventListener('change', onSelect);

function onSelect(event) {
  const breedId = event.target.value;

  if (breedId === '') {
    return;
  }
  loader.classList.remove('is-hidden');

  catInfo.innerHTML = '';
  fetchCatByBreed(breedId)
    .then(catData => {
      if (catData && catData.breeds && catData.breeds.length > 0) {
        createMarkup(catData);
      } else {
        onFetchError();
      }
    })
    .catch(onFetchError);
}

function createMarkup(oneCat) {
  const { name, description, temperament } = oneCat.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div class="cat-info">
      <img src="${oneCat.url}" alt="${name}" width="320"/>
      <h1 class="cat-breed">${name}</h1>
      <p>${description}</p>
      <p><b>Temperament: </b>${temperament}</p>
    </div>`
  );
  loader.classList.add('is-hidden');
}

function onFetchError() {
  catInfo.innerHTML = '';
  loader.classList.add('is-hidden');
  Notiflix.Report.failure(
    'Error',
    'Oops! Something went wrong! Try reloading the page!',
    'OK'
  );
}
