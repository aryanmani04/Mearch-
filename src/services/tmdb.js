const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

// Normalizes a raw TMDB movie object into the shape Card.jsx expects
const formatMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  year: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
  genres: movie.genre_names || [], // filled in by attachGenres if needed
  genre_ids: movie.genre_ids || [],
  rating: movie.vote_average ? Number(movie.vote_average.toFixed(1)) : 0,
  poster: movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : null,
  backdrop: movie.backdrop_path ? `${BACKDROP_BASE}${movie.backdrop_path}` : null,
  overview: movie.overview,
});

let genreMapCache = null;

// TMDB list endpoints only return genre_ids, not names, so we fetch the
// id -> name map once and cache it.
export async function getGenreMap() {
  if (genreMapCache) return genreMapCache;

  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch genres");

  const data = await res.json();
  genreMapCache = Object.fromEntries(
    data.genres.map((g) => [g.id, g.name])
  );
  return genreMapCache;
}

async function attachGenres(movies) {
  const genreMap = await getGenreMap();
  return movies.map((movie) => ({
    ...movie,
    genre_names: (movie.genre_ids || []).map((id) => genreMap[id]).filter(Boolean),
  }));
}

export async function getPopularMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch popular movies");

  const data = await res.json();
  const withGenres = await attachGenres(data.results);
  return { movies: withGenres.map(formatMovie), totalPages: data.total_pages };
}

export async function searchMovies(query, page = 1) {
  if (!query?.trim()) return { movies: [], totalPages: 0 };

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to search movies");

  const data = await res.json();
  const withGenres = await attachGenres(data.results);
  return { movies: withGenres.map(formatMovie), totalPages: data.total_pages };
}

export async function getMovieDetails(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");

  const movie = await res.json();
  return formatMovie({
    ...movie,
    genre_names: movie.genres?.map((g) => g.name) || [],
  });
}

// Used for the homepage hero — trending movies tend to have punchier backdrops
export async function getTrendingMovies() {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch trending movies");

  const data = await res.json();
  const withGenres = await attachGenres(data.results);
  return withGenres.map(formatMovie);
}