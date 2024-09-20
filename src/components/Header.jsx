import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabaseClient";
import SearchBar from "./SearchBar";
import Logo from "../assets/logoasli.jpg";

const Header = ({ onBackToHome, onMovieClick, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      navigate("/"); // Redirect to the landing page
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between h-16 px-4 bg-blue-900 text-blue-100 z-30">
      <div className="flex items-center">
        <button
          className="mr-4 p-2 hover:bg-blue-800 rounded-full transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <motion.img
          src={Logo}
          alt="logo"
          className="w-10 h-10 rounded-full border-2 border-blue-400 shadow-lg transition-transform duration-300 mr-4"
          onClick={onBackToHome}
          whileHover={{
            scale: 1.1,
            rotate: 360,
            transition: { duration: 0.3 },
          }}
          style={{ cursor: "pointer" }}
        />

        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={onBackToHome}
        >
          Cloud Hotstar
        </h1>
      </div>
      <div className="flex items-center">
        <SearchBar onMovieClick={onMovieClick} />
        <button
          onClick={() => navigate("/profile")}
          className="ml-4 p-2 hover:bg-blue-800 rounded-full transition-colors"
          aria-label="Profile"
        >
          <svg
            className="w-8 h-8 text-blue-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </button>
        <button
          onClick={handleLogout}
          className="ml-4 bg-blue-700 hover:bg-blue-600 text-blue-100 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
