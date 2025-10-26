//TMDB API
const API_KEY = "api_key=6aecc18374bbe900a633560c56cc2e1a";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL =
  BASE_URL +
  "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&" +
  API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "search/movie?" + API_KEY;
// NOVO: URL para buscar Atores (Persons)
const actorSearchURL = BASE_URL + "search/person?" + API_KEY;

const genre = [
  { id: 12, name: "Adventure" },
  { id: 14, name: "Fantasy" },
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 36, name: "History" },
  { id: 37, name: "Western" },
  { id: 53, name: "Thriller" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 878, name: "Science Fiction" },
  { id: 9648, name: "Mystery" },
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romance" },
  { id: 10751, name: "Family" },
  { id: 10752, name: "War" },
  { id: 10770, name: "TV Movie" },
  { id: 28, name: "Action" },
];

// NOVO: Lista de idiomas (simplificada)
const LANGUAGES = [
  { code: "en", name: "Inglês" },
  { code: "es", name: "Espanhol" },
  { code: "fr", name: "Francês" },
  { code: "pt", name: "Português" },
  { code: "de", name: "Alemão" },
  { code: "ja", name: "Japonês" },
  { code: "hi", name: "Hindi" },
];

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsElement = document.getElementById("tags");

// NOVAS: Referências de DOM para os filtros
const actorSearch = document.getElementById("actor-search");
const yearFilter = document.getElementById("year-filter");
const languageFilter = document.getElementById("language-filter");

let selectedGenre = []; // Mantém os gêneros selecionados

// Verifica se todos os elementos foram encontrados
if (
  !main ||
  !form ||
  !search ||
  !tagsElement ||
  !actorSearch ||
  !yearFilter ||
  !languageFilter
) {
  console.error("Erro: Alguns elementos DOM não foram encontrados!");
}

// Popula os filtros de Ano e Idioma ao carregar
populateFilters();

const highlightSelection = () => {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("highlight");
  });
  // Limpa tags se selectedGenre estiver vazio
  if (selectedGenre.length !== 0) {
    selectedGenre.forEach((id) => {
      const highlightedTag = document.getElementById(id);
      if (highlightedTag) {
        // Adiciona checagem
        highlightedTag.classList.add("highlight");
      }
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
      // CORREÇÃO: Lógica de seleção/deseleção corrigida
      if (selectedGenre.includes(genre.id)) {
        // Remove o gênero
        selectedGenre = selectedGenre.filter((id) => id !== genre.id);
      } else {
        // Adiciona o gênero
        selectedGenre.push(genre.id);
      }
      console.log(selectedGenre);

      // Limpa os campos de busca ao filtrar por gênero
      search.value = "";
      actorSearch.value = "";

      // Chama a função central de busca
      fetchMoviesWithFilters();
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
      if (data.results && data.results.length !== 0) {
        showMovies(data.results);
      } else {
        main.innerHTML = `<h1 class="no-results"> Nenhum resultado encontrado </h1>`;
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar filmes:", error);
      main.innerHTML = `<h1 class="no-results"> Erro ao buscar. Tente novamente. </h1>`;
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
    src= "${
      poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/300x450"
    }"
    alt="${title}"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(vote_average)}">${vote_average.toFixed(1)}</span>
  </div>
  <div class="overview">
    <h3>Synopsis</h3>
    ${overview}
  </div>
    `;
    main.appendChild(movieElement);
  });
};

// Função para colorir a nota
const getColor = (vote) => {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 4) {
    return "orange";
  } else {
    return "red";
  }
};

// Listener do formulário (Busca por TÍTULO)
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchResult = search.value;

  // Limpa os outros filtros ao buscar
  selectedGenre = [];
  highlightSelection();
  actorSearch.value = "";
  yearFilter.value = "";
  languageFilter.value = "";

  if (searchResult) {
    getPopularMovies(searchURL + "&query=" + searchResult);
  } else {
    getPopularMovies(API_URL); // Volta ao padrão se a busca for vazia
  }
});

// Popula os dropdowns de filtro
function populateFilters() {
  // Popula Anos (do ano atual até 1900)
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.innerText = year;
    yearFilter.appendChild(option);
  }

  // Popula Idiomas
  LANGUAGES.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.innerText = lang.name;
    languageFilter.appendChild(option);
  });
}

// Listeners para os filtros de Ano e Idioma
yearFilter.addEventListener("change", () => {
  search.value = "";
  actorSearch.value = "";
  fetchMoviesWithFilters();
});

languageFilter.addEventListener("change", () => {
  search.value = "";
  actorSearch.value = "";
  fetchMoviesWithFilters();
});

// Listener para Enter no campo de busca por título
search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    form.dispatchEvent(new Event("submit"));
  }
});

// Listener para busca por ATOR (dispara ao "perder o foco" ou dar Enter)
actorSearch.addEventListener("change", () => {
  const actorName = actorSearch.value;

  if (actorName) {
    // Limpa os outros filtros
    search.value = "";
    selectedGenre = [];
    highlightSelection();
    // (Mantemos ano e idioma, se desejado)

    // Inicia a busca pelo ator
    searchByActor(actorName);
  } else {
    // Se o campo de ator for limpo, volta aos filtros normais
    fetchMoviesWithFilters();
  }
});

// Listener para Enter no campo de busca por ator
actorSearch.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const actorName = actorSearch.value;
    if (actorName) {
      search.value = "";
      selectedGenre = [];
      highlightSelection();
      searchByActor(actorName);
    }
  }
});

// Função central para construir URL de descoberta
function fetchMoviesWithFilters() {
  let url = API_URL; // Começa com a URL base de descoberta

  // Adiciona Gêneros
  if (selectedGenre.length > 0) {
    url += "&with_genres=" + encodeURI(selectedGenre.join(","));
  }

  // Adiciona Ano
  const year = yearFilter.value;
  if (year) {
    url += "&primary_release_year=" + year;
  }

  // Adiciona Idioma
  const lang = languageFilter.value;
  if (lang) {
    url += "&with_original_language=" + lang;
  }

  getPopularMovies(url);
}

// Função de busca por Ator (Processo de 2 etapas)
async function searchByActor(actorName) {
  try {
    // 1. Busca o ID do Ator
    const response = await fetch(
      actorSearchURL + "&query=" + encodeURI(actorName)
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const actorId = data.results[0].id; // Pega o primeiro ator encontrado
      console.log("Ator encontrado, ID:", actorId);

      // 2. Busca filmes com esse ator (usando a URL de descoberta)
      // Combina a busca de ator com os outros filtros (ano, idioma, gênero)

      let url = API_URL + "&with_cast=" + actorId;

      // Adiciona Gêneros
      if (selectedGenre.length > 0) {
        url += "&with_genres=" + encodeURI(selectedGenre.join(","));
      }
      // Adiciona Ano
      const year = yearFilter.value;
      if (year) {
        url += "&primary_release_year=" + year;
      }
      // Adiciona Idioma
      const lang = languageFilter.value;
      if (lang) {
        url += "&with_original_language=" + lang;
      }

      getPopularMovies(url);
    } else {
      main.innerHTML = `<h1 class="no-results"> Ator não encontrado </h1>`;
    }
  } catch (error) {
    console.error("Erro ao buscar ator:", error);
    main.innerHTML = `<h1 class="no-results"> Erro ao buscar ator </h1>`;
  }
}
