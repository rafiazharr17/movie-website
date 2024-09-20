import React, { useState, useEffect } from "react";
import { fetchMoviesByGenre } from "../utils/api";

const GenreMovies = ({ genreId, genreName, onMovieClick }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const genreMovies = await fetchMoviesByGenre(genreId);
      setMovies(genreMovies);
    };
    loadMovies();
  }, [genreId]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-blue-300">
        {genreName} Movies
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer"
            onClick={() => onMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <h3 className="mt-2 text-lg font-semibold text-blue-200">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreMovies;
