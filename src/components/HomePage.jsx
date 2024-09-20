import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FeaturedMovie from "./FeaturedMovie";
import GenreMovies from "./GenreMovies";
import MovieGrid from "./MovieGrid";
import MovieDetails from "./MovieDetails";
import { fetchTrendingMovies, fetchGenres } from "../utils/api";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      const movies = await fetchTrendingMovies();
      setTrendingMovies(movies);
      const genreList = await fetchGenres();
      setGenres(genreList);
    };
    loadInitialData();
  }, []);

  const handleGenreClick = (genreId, genreName) => {
    setSelectedGenre({ id: genreId, name: genreName });
    setSelectedMovie(null);
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovie(movieId);
  };

  const handleCloseMovieDetails = () => {
    setSelectedMovie(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-blue-100">
      <Header
        onBackToHome={() => {
          setSelectedGenre(null);
          setSelectedMovie(null);
        }}
        onMovieClick={handleMovieClick}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onGenreClick={handleGenreClick}
        genres={genres}
      />
      <main className="pt-16 px-4 md:px-8">
        {selectedMovie ? (
          <MovieDetails
            movieId={selectedMovie}
            onClose={handleCloseMovieDetails}
            onMovieClick={handleMovieClick}
          />
        ) : (
          <>
            {!selectedGenre && trendingMovies.length > 0 && (
              <FeaturedMovie
                movies={trendingMovies.slice(0, 5)}
                onMovieClick={handleMovieClick}
              />
            )}
            {selectedGenre ? (
              <GenreMovies
                genreId={selectedGenre.id}
                genreName={selectedGenre.name}
                onMovieClick={handleMovieClick}
              />
            ) : (
              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-4">Trending Movies</h2>
                <MovieGrid
                  movies={trendingMovies}
                  onMovieClick={handleMovieClick}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
