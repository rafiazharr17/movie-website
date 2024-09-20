import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../utils/supabaseClient";
import Logo from "../assets/logoasli.jpg";

const AdminHeader = ({ toggleSidebar, onDashboardClick }) => {
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
          className="w-10 h-10 rounded-full border-2 border-blue-400 shadow-lg mr-4"
          onClick={onDashboardClick}
          whileHover={{
            scale: 1.1,
            rotate: 360,
            transition: { duration: 0.3 },
          }}
          style={{ cursor: "pointer" }}
        />
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={onDashboardClick}
        >
          Admin Dashboard
        </h1>
      </div>
      <div className="flex items-center">
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

export default AdminHeader;
