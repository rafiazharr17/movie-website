import React, { useState, useEffect } from "react";
import { fetchMovieDetails, fetchRelatedMovies } from "../utils/api";
import { motion } from "framer-motion";

const MovieDetails = ({ movieId, onMovieClick, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const details = await fetchMovieDetails(movieId);
        setMovie(details);
        const related = await fetchRelatedMovies(movieId);
        setRelatedMovies(related.slice(0, 6));
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-blue-200">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center text-blue-200">Movie not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative bg-blue-900 text-blue-100 rounded-lg shadow-xl"
    >
      <div className="relative h-96">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/80 to-transparent"></div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-100 bg-blue-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-6 flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-4xl font-bold mb-2 text-blue-200">
            {movie.title}
          </h2>
          <div className="flex items-center space-x-4 mb-4 text-blue-300">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span className="bg-blue-700 text-blue-100 px-2 py-1 rounded">
              {movie.vote_average.toFixed(1)}
            </span>
            <span>{movie.runtime} min</span>
          </div>
          <p className="text-lg mb-6">{movie.overview}</p>

          {movie.videos.results.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2 text-blue-200">
                Trailer
              </h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-64 rounded-lg"
                ></iframe>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-blue-200">Cast</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {movie.credits.cast.slice(0, 6).map((actor) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="font-semibold text-sm text-blue-200">
                    {actor.name}
                  </p>
                  <p className="text-xs text-blue-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>

          {relatedMovies.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-blue-200">
                Related Movies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {relatedMovies.map((relatedMovie) => (
                  <div
                    key={relatedMovie.id}
                    className="cursor-pointer"
                    onClick={() => onMovieClick(relatedMovie.id)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${relatedMovie.poster_path}`}
                      alt={relatedMovie.title}
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                    <p className="font-semibold text-sm text-blue-200">
                      {relatedMovie.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MovieDetails;
