const API_URL = "https://api.themoviedb.org/3/";
const APIKey = "api_key=29a62049dc373ada0ffcf6191b950e4f";
const movieURL = "movie/";

const moviesContainer = document.querySelector("#movies");
const formSearch = document.getElementById("form");
const searchInput = document.getElementById("searchId");

const imageBaseUrl = "https://image.tmdb.org/t/p/";
const posterSize = "original";

const showMovies = (movies) => {
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const imageUrl = `${imageBaseUrl}${posterSize}${movie.poster_path}`;
    moviesContainer.innerHTML += `
      <div class="card col-lg-3 col-xs-12 col-md-6">
       <img src="${imageUrl}" alt="${movie.title}">
       <div class="card-body">
        <h3 class="card-header">${movie.title}</h3>
        <h5 class="card-title">${movie.genre_ids}</h5>
        <p>${movie.overview}</p>
       </div>
      </div>
      `;
  });
};

// const options = {
//   method: "GET",
//   url: "https://api.themoviedb.org/3/search/movie",
//   params: {
//     query: `${searchInput}`,
//     include_adult: "false",
//     language: "es-ES",
//     page: "1",
//   },
//   headers: {
//     accept: "application/json",
//     Authorization: "Bearer 29a62049dc373ada0ffcf6191b950e4f",
//   },
// };
//https://api.themoviedb.org/3/search/movie?query=fight&include_adult=false&language=es-ES&page=1&api_key=29a62049dc373ada0ffcf6191b950e4f
//${API_URL}search/movie?query=${searchInput}&include_adult=false&language=es-ES&page=1&${APIKey}
// https://api.themoviedb.org/3/movie/550?api_key=29a62049dc373ada0ffcf6191b950e4f
//${API_URL}
const searchMovie = async (event) => {
  event.preventDefault();
  //   try {const res = await axios.get(`${API_URL}search/movie?query=${searchInput}&include_adult=false&language=es-ES&${APIKey}`)
  try {
    const search = searchInput.value;
    const res = await axios.get(
      `${API_URL}search/movie?query=${search}&include_adult=false&language=es-ES&${APIKey}`
    );
    const movies = res.data.results;
    showMovies(movies);
    console.log(res.data.results);
  } catch (error) {
    console.error(error);
  }

  // .request(options)
  // .then((res) => console.log(res.data))
  // .catch((err) => console.error(err));

  // const search = searchInput.value;
  // const res = await axios.get(`${API_URL}/?name=${search}`);
  // const characters = res.data.results;
  //     showMovies(movies);
  //   } catch (error) {
  //     console.error(error);
  //    }
};

formSearch.addEventListener("submit", searchMovie);
//Imagen -> poster_path
//Titulo -> title
//Descripcion -> overview
//Genero -> genres:name:
