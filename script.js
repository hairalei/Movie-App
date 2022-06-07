"use strict";
//3fca8486a71acd94466dff06b14eb1c3
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fca8486a71acd94466dff06b14eb1c3&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fca8486a71acd94466dff06b14eb1c3&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.querySelector("#main");

/////////////////////////////////////////
function showMovies(movies) {
  main.innerHTML = "";

  if (movies.length === 0)
    main.innerHTML = `<h1 style="color: white; margin: 2rem auto">No movies found. Try again!</h1>`;

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const markup = `
    <div class="movie">
        <img
          src="${IMG_PATH + poster_path}"
          alt="Picture of the ${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${changeClass(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
          <p>
          ${overview}
          </p>
        </div>
      </div>
    `;

    main.insertAdjacentHTML("beforeend", markup);
  });
}

function changeClass(ave) {
  if (ave >= 8) return "green";
  else if (ave < 8 && ave >= 5) return "orange";
  else return "red";
}

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
  console.log(data.results);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

/////
getMovies(API_URL);
