const getMovieFromLocalStorage = JSON.parse(
  localStorage.getItem('myWatchlist')
);

let watchArray = document.getElementById('watchContainer');
let clickedArray = [];

// get item from local storage
if (getMovieFromLocalStorage) {
  clickedArray = getMovieFromLocalStorage;
  console.log(clickedArray);
  displayInnerHtml(clickedArray);
}

function displayInnerHtml(clickedArray) {
  clickedArray.map((movie, index) => {
    watchArray.innerHTML += `

    <div class="movie-result" id=${index}>

    <img
    alt="movie image"
    id="movie-img"
    src="${movie.Poster}"
    />

    <div class="movie-details">
        <div class="title">
          <h3 id="movie-title">${movie.Title}</h3>
          <p id="rating">${movie.imdbRating}</p>
        </div>
        <div class="action-btn">
          <p id="time">${movie.Runtime}</p>
          <p id="genre">${movie.Genre}</p>

          <button class="add" id="${movie.imdbID}" value="${movie.imdbID}">Remove</button>
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
  });
}

document.getElementById('watchContainer').addEventListener('click', removeItem);
function removeItem(e) {
  e.preventDefault();

  if (e.target.innerHTML === 'Remove') {
    let itemId = e.target.value;
    console.log(itemId);
    clickedArray = clickedArray.filter((item) => item.imdbID != e.target.value);
    localStorage.setItem('myWatchlist', JSON.stringify(clickedArray));

    watchArray.innerHTML = '';
    displayInnerHtml(clickedArray);
  } else {
    console.log('filleeee');
  }
}
