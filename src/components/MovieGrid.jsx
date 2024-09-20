import React from "react";

const MovieGrid = ({ movies, onMovieClick }) => {
  return (
    <section className="mt-8">
      <h3 className="text-2xl md:text-3xl font-bold font-heading mb-6 text-blue-300">
        Trending Movies
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative group overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="aspect-[2/3] relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-2 md:p-4">
                <h4 className="text-blue-100 text-center font-bold text-sm md:text-lg mb-1 md:mb-2 line-clamp-2">
                  {movie.title}
                </h4>
                <div className="flex items-center space-x-2 mb-1 md:mb-2">
                  <span className="text-blue-200 text-xs md:text-sm">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                  <span className="text-yellow-400 text-xs md:text-sm bg-blue-800/50 px-1 md:px-2 py-0.5 md:py-1 rounded-full">
                    ★ {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-blue-100 font-semibold text-xs md:text-sm py-1 md:py-2 px-2 md:px-4 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMovieClick(movie.id);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;
