// Affichage : création des vignettes, meilleur film, modale, bouton "Voir plus"

const PLACEHOLDER = "assets/placeholder.svg";
const modal = document.getElementById("modal");

// Met l'affiche du film dans une balise <img>,
// ou l'image de remplacement si l'affiche ne charge pas
function setPoster(img, movie) {
  img.src = movie.image_url || PLACEHOLDER;
  img.alt = movie.title;
  img.onerror = () => {
    img.onerror = null;
    img.src = PLACEHOLDER;
  };
}

// Crée la vignette d'un film : affiche + bandeau avec le titre et "Détails"
function createMovieCard(movie) {
  const card = document.createElement("li");
  card.className = "movie-card";
  card.innerHTML = `
    <img class="movie-card__img" data-id="${movie.id}">
    <div class="movie-card__band">
      <h3 class="movie-card__title"></h3>
      <button type="button" class="btn movie-card__btn" data-id="${movie.id}">Détails</button>
    </div>
  `;
  // textContent plutôt que innerHTML pour le titre : il vient de l'API
  card.querySelector(".movie-card__title").textContent = movie.title;
  setPoster(card.querySelector("img"), movie);
  return card;
}

// Vide la grille d'une section puis y ajoute les films
function showMovies(section, movies) {
  const grid = section.querySelector(".movies__grid");
  grid.innerHTML = "";
  movies.forEach((movie) => {
    grid.append(createMovieCard(movie));
  });
}

// Remplit la zone "Meilleur film"
function showBestMovie(movie) {
  const img = document.querySelector(".best-movie__img");
  setPoster(img, movie);
  img.dataset.id = movie.id;

  document.querySelector(".best-movie__title").textContent = movie.title;
  document.querySelector(".best-movie__summary").textContent = movie.description;
  document.querySelector(".best-movie__btn").dataset.id = movie.id;
}

// 48200000 devient "$48.2m", comme sur la maquette
function formatBoxOffice(amount) {
  if (!amount) {
    return "non communiquées";
  }
  if (amount < 1000000) {
    return "$" + amount.toLocaleString("en-US");
  }
  return "$" + (amount / 1000000).toFixed(1) + "m";
}

// Remplit la modale avec le détail du film puis l'ouvre
function openModal(movie) {
  setPoster(document.getElementById("modal-img"), movie);

  document.getElementById("modal-title").textContent = movie.title;
  document.getElementById("modal-year-genres").textContent =
    movie.year + " - " + movie.genres.join(", ");
  document.getElementById("modal-rated-duration").textContent =
    movie.rated + " - " + movie.duration + " minutes (" + movie.countries.join(" / ") + ")";
  document.getElementById("modal-score").textContent =
    "IMDB score: " + movie.imdb_score + "/10";
  document.getElementById("modal-box-office").textContent =
    "Recettes au box-office: " + formatBoxOffice(movie.worldwide_gross_income);
  document.getElementById("modal-directors").textContent = movie.directors.join(", ");
  document.getElementById("modal-summary").textContent = movie.long_description;
  document.getElementById("modal-actors").textContent = movie.actors.join(", ");

  modal.showModal();
}

// La croix (mobile/tablette) et le bouton "Fermer" (ordinateur) ferment la modale
function setupModal() {
  modal.querySelectorAll(".modal__cross, .modal__btn").forEach((button) => {
    button.addEventListener("click", () => {
      modal.close();
    });
  });
}

// Bouton "Voir plus" / "Voir moins" d'une section
// La classe is-open affiche les films cachés (voir le CSS)
function setupMoreButton(section) {
  const button = section.querySelector(".movies__more");
  button.addEventListener("click", () => {
    section.classList.toggle("is-open");
    if (section.classList.contains("is-open")) {
      button.textContent = "Voir moins";
    } else {
      button.textContent = "Voir plus";
    }
  });
}

// Message affiché si l'API ne répond pas
function showError(error) {
  console.error(error);
  const box = document.getElementById("error");
  box.textContent = "Impossible de contacter l'API OCMovies. Vérifiez qu'elle tourne sur http://localhost:8000";
  box.hidden = false;
}
