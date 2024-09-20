import React, { useState, useEffect } from "react";

const FeaturedMovie = ({ movies, onMovieClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [movies]);

  const movie = movies[currentIndex];

  return (
    <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <h2 className="text-4xl font-bold mb-2 text-blue-100">{movie.title}</h2>
        <p className="text-lg mb-4 text-blue-200">{movie.overview}</p>
        <button
          onClick={() => onMovieClick(movie.id)}
          className="bg-blue-600 text-blue-100 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default FeaturedMovie;
