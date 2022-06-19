import { API_KEY } from '/apikeys.js';

const search = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
let inputVal;

const movieVal = document.getElementById('movie-container');
const getMovieFromLocalStorage = JSON.parse(
  localStorage.getItem('myWatchlist')
);

let watchArray = document.getElementById('watchContainer');
let initialWatchList = document.querySelector('.hide');
let clickedArray = [];

// innerHtml display movie search result
let displayHtml = (movie, displayMovie) => {
  displayMovie.innerHTML += `

  <div class="movie-result" id=${movie.imdbID}>

  <img
  alt="movie image"
  id="movie-img"
  src="${movie.Poster}"
  />

  <div class="movie-details">
      <div class="title">
        <h3 id="movie-title">${movie.Title}</h3>
    <p id="rating"><span id="star">&#9733</span> &nbsp;${movie.imdbRating}</p>
      </div>
      <div class="action-btn">
        <p id="time">${movie.Runtime}</p>
        <p id="genre">${movie.Genre}</p>

        <button class="add" id="${movie.imdbID}" value="${movie.imdbID}"><span id="sign">&#65291</span> Watchlist</button>
      </div>
      <div class="movie-summary">
        <p id="summary">
          ${movie.Plot}
        </p>
      </div>

      </div>

    </div>
    <div id="hr"></div>

  `;
};

// get item from local storage
if (getMovieFromLocalStorage) {
  clickedArray = getMovieFromLocalStorage;
  console.log(clickedArray);

  displayInnerHtml(clickedArray);
}

// hide or display the watchlist initial screen
if (clickedArray.length === 0) {
  if (initialWatchList) {
    initialWatchList.style.display = 'block';
  }
}

// Trigger the searchbar on input
if (searchBtn) {
  searchBtn.addEventListener('click', function (e) {
    e.preventDefault();

    inputVal = search.value.toLowerCase();
    movieVal.innerHTML = '';
    getMovie(inputVal);
  });
}

// call the api
async function getMovie(val) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${val}&plot='short'&apikey=${API_KEY}`
    );
    const data = await response.json();

    const movie_result = data.Search;

    movie_result.map(async (movie, index) => {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&plot='short'&apikey=${API_KEY}`
      );
      const movieResponse = await res.json();

      displayHtml(movieResponse, movieVal);

      search.value = '';
    });
  } catch (err) {
    movieVal.innerHTML = `<div id="search-error">
    <h3>Unable to find what you’re looking for. Please try another search.</h3>
    </div>`;
  }
}

if (movieVal) {
  movieVal.addEventListener('click', function (e) {
    e.preventDefault();
    let saveId;
    if (e.target.tagName === 'BUTTON') {
      saveId = e.target.value;
    }

    saveToList(saveId);
  });
}

async function saveToList(id) {
  const data = await fetch(
    `https://www.omdbapi.com/?i=${id}&plot='short'&apikey=${API_KEY}`
  );
  const response = await data.json();

  clickedArray.unshift(response);

  localStorage.setItem('myWatchlist', JSON.stringify(clickedArray));
}
// display innerhtml
function displayInnerHtml(clickedArray) {
  clickedArray.map((movie) => {
    if (watchArray) {
      watchArray.innerHTML += `

    <div class="movie-result" id=${movie.imdbID}>

    <img
    alt="movie image"
    id="movie-img"
    src="${movie.Poster}"
    />

    <div class="movie-details">
        <div class="title">
          <h3 id="movie-title">${movie.Title}</h3>
          <p id="rating"><span id="star">&#9733</span> ${movie.imdbRating}</p>
        </div>
        <div class="action-btn">
          <p id="time">${movie.Runtime}</p>
          <p id="genre">${movie.Genre}</p>

          <button class="remove" id="${movie.imdbID}" value="${movie.imdbID}"><span id="sign">&#65293</span> Remove</button>
        </div>
        <div class="movie-summary">
          <p id="summary">
            ${movie.Plot}
          </p>
        </div>

        </div>

      </div>
      <div id="hr"></div>

    `;
    }
  });
}

if (watchArray) {
  watchArray.addEventListener('click', removeItem);
  function removeItem(e) {
    e.preventDefault();
    let itemId = e.target.value;
    if (e.target.value === itemId) {
      console.log(e.target.value);
      clickedArray = clickedArray.filter(
        (item) => item.imdbID != e.target.value
      );
      localStorage.setItem('myWatchlist', JSON.stringify(clickedArray));

      watchArray.innerHTML = '';
      displayInnerHtml(clickedArray);
    } else {
      console.log('filleeee');
    }
  }
}
