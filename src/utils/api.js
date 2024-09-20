const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  const data = await response.json();
  return data;
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search movies');
  }
  const data = await response.json();
  return data.results;
};

export const fetchGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  const data = await response.json();
  return data.genres;
};

export const fetchMoviesByGenre = async (genreId) => {
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies by genre');
  }
  const data = await response.json();
  return data.results;
};

export const fetchRelatedMovies = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch related movies');
  }
  const data = await response.json();
  return data.results;
};