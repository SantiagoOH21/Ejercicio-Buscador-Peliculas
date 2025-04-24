const API_URL = "https://api.themoviedb.org/3/";
const APIKey = "29a62049dc373ada0ffcf6191b950e4f";

const moviesContainer = document.querySelector("#movies");
const formSearch = document.getElementById("form");
const searchInput = document.getElementById("searchId");

const imageBaseUrl = "https://image.tmdb.org/t/p/";
const posterSize = "w342"; //"poster_sizes":["w92","w154","w185","w342","w500","w780","original"]

const obtainMovieGenres = async () => {
  try {
    const res = await axios.get(
      `${API_URL}genre/movie/list?language=es&api_key=${APIKey}`
    );
    const movieGenres = res.data.genres;
    return movieGenres;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const changeMovieGenres = (movieGenres, genreIds) => {
  const matchingGenres = movieGenres.filter((movieGenre) =>
    genreIds.includes(movieGenre.id)
  );
  const genreNames = matchingGenres.map((movieGenre) => movieGenre.name);
  return genreNames.join(", ");
};

const obtainGenreText = async (genreIds) => {
  if (genreIds.length === 0) {
    return "Sin género establecido";
  } else {
    const movieGenres = await obtainMovieGenres();
    return changeMovieGenres(movieGenres, genreIds);
  }
};

const genreText = async (genreIds) => {
  try {
    const modifiedGenre = await obtainGenreText(genreIds);
    return modifiedGenre;
  } catch (error) {
    console.error(error);
    return "";
  }
};

const showMovies = async (movies) => {
  moviesContainer.innerHTML = "";
  try {
    for (const movie of movies) {
      const modifiedGenre = await genreText(movie.genre_ids);
      const imageUrl = `${imageBaseUrl}${posterSize}${movie.poster_path}`;
      moviesContainer.innerHTML += `
      <div class="card col-lg-3 col-xs-12 col-md-6">
         <img src="${imageUrl}" alt="${movie.title}">
         <div class="card-body">
         <h3 class="card-header">${movie.title}</h3>
          <h5 class="card-title mt-2">Género: ${modifiedGenre}</h5>
          <p>SINOPSIS <br>${movie.overview}</p>
         </div>
        </div>
        `;
    }
  } catch (error) {
    console.error(error);
  }
};

const searchMovie = async (event) => {
  event.preventDefault();
  try {
    const search = searchInput.value;
    const res = await axios.get(
      `${API_URL}search/movie?query=${search}&include_adult=false&language=es-ES&api_key=${APIKey}`
    );
    const movies = res.data.results;
    await showMovies(movies);
  } catch (error) {
    console.error(error);
  }
};

formSearch.addEventListener("submit", searchMovie);
