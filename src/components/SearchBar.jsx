import React, { useState, useEffect } from "react";
import { searchMovies } from "../utils/api";

const SearchBar = ({ onMovieClick }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.trim()) {
        const searchResults = await searchMovies(query);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search movies..."
        className="bg-blue-800 text-blue-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 w-full transition-all duration-300 transform origin-left hover:pl-20 hover:bg-blue-700"
      />
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-blue-900 rounded-lg shadow-lg max-w-lg max-h-64 overflow-y-auto">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center p-2 hover:bg-blue-800 cursor-pointer text-blue-100"
              onClick={() => {
                onMovieClick(movie.id);
                setResults([]);
                setQuery("");
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="w-12 h-18 rounded-lg mr-2"
              />
              <span>{movie.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
