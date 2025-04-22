const API_URL = "https://api.themoviedb.org/3/";
const APIKey = "29a62049dc373ada0ffcf6191b950e4f";

const moviesContainer = document.querySelector("#movies");
const formSearch = document.getElementById("form");
const searchInput = document.getElementById("searchId");

const imageBaseUrl = "https://image.tmdb.org/t/p/";
const posterSize = "original";

const saveMovieGenres = async () => {
  try {
    const res = await axios.get(
      `${API_URL}genre/movie/list?language=es&api_key=${APIKey}`
    );
    const movieGenres = res.data.genres;
    console.log(movieGenres);
    return movieGenres;
  } catch (error) {
    console.error(error);
  }
};

const changeMovieGenres = (movieGenres, genreIds) => {
  const matchingGenres = movieGenres.filter((movieGenre) =>
    genreIds.includes(movieGenre.id)
  );
  const genreNames = matchingGenres.map((movieGenre) => movieGenre.name);
  return genreNames.join(", ");
};

const genreIds = [18, 28, 53];

const obtainGenre = async () => {
  const movieGenres = await saveMovieGenres();
  const genresLog = changeMovieGenres(movieGenres, genreIds);
  console.log("genresLog:", genresLog);
};

obtainGenre();

const showMovies = (movies) => {
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const imageUrl = `${imageBaseUrl}${posterSize}${movie.poster_path}`;
    moviesContainer.innerHTML += `
    <div class="card col-lg-3 col-xs-12 col-md-6">
       <img src="${imageUrl}" alt="${movie.title}">
       <div class="card-body">
       <h3 class="card-header">${movie.title}</h3>
        <h5 class="card-title">Género: ${movie.genre_ids}</h5>
        <p>SINOPSIS <br>${movie.overview}</p>
       </div>
      </div>
      `;
  });
};

const searchMovie = async (event) => {
  event.preventDefault();
  try {
    const search = searchInput.value;
    const res = await axios.get(
      `${API_URL}search/movie?query=${search}&include_adult=false&language=es-ES&api_key=${APIKey}`
    );
    const movies = res.data.results;
    showMovies(movies);
    console.log(res.data.results);
  } catch (error) {
    console.error(error);
  }
};

formSearch.addEventListener("submit", searchMovie);

//Imagen -> poster_path
//Titulo -> title
//Descripcion -> overview
//Genero -> genres:name:
