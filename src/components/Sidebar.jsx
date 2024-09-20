import React from "react";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen, onClose, onGenreClick, genres }) => {
  return (
    <div
      className={`fixed top-16 left-0 bottom-0 w-64 bg-blue-900 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-40`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-200">Genres</h2>
        <ul>
          {genres.map((genre) => (
            <motion.li
              key={genre.id}
              className="mb-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                onClick={() => onGenreClick(genre.id, genre.name)}
                className="text-blue-100 hover:text-blue-300 transition-colors w-full text-left p-2 rounded-md"
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              >
                {genre.name}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
