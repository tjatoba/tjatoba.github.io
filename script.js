//TMDB API
const API_KEY = "api_key=6aecc18374bbe900a633560c56cc2e1a";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL =
  BASE_URL +
  "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&" +
  API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const searchURL = BASE_URL + "search/movie?" + API_KEY;

const genre = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsElement = document.getElementById("tags");

let selectedGenre = [];

const highlightSelection = () => {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("highlight");
  });
  if (selectedGenre.length !== 0) {
    selectedGenre.forEach((id) => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add("highlight");
    });
  }
};

const setGenre = () => {
  tagsElement.innerHTML = "";

  genre.forEach((genre) => {
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.id = genre.id;
    tag.innerText = genre.name;
    tag.addEventListener("click", () => {
      if (selectedGenre.length === 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, index) => {
            if (id === genre.id) {
              selectedGenre.splice(index, 1);
            } else {
              selectedGenre.push(genre.id);
            }
          });
        }
      }
      console.log(selectedGenre);
      getPopularMovies(
        API_URL + "&with_genres=" + encodeURI(selectedGenre.join(","))
      );
      highlightSelection();
    });
    tagsElement.append(tag);
  });
};
setGenre();

const getPopularMovies = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.results.length !== 0) {
        showMovies(data.results);
      } else {
        main.innerHTML = `<h1 class="no-results"> No Results Found </h1>`;
      }
    });
};
getPopularMovies(API_URL);

const showMovies = (data) => {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
     <img
    src= "${IMG_URL + poster_path}"
    alt="${title}"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>Synopsis</h3>
    ${overview}
  </div>
    `;
    main.appendChild(movieElement);
  });
};

const getColor = (vote) => {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 4) {
    return "orange";
  } else {
    return "red";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchResult = search.value;
  selectedGenre = [];
  setGenre();

  if (searchResult) {
    getPopularMovies(searchURL + "&query=" + searchResult);
  } else {
    getPopularMovies(API_URL);
  }
});
