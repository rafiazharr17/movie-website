import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import logo from "../assets/logoasli.jpg";
import action from "../assets/action.jpg";
import comedy from "../assets/comedy.jpg";
import romance from "../assets/romance.jpg";
import adventure from "../assets/adventure.jpg";
import horror from "../assets/horror.jpg";
import animation from "../assets/animation.jpg";
import scifi from "../assets/scifi.jpg";

const genreImages = {
  Action: action,
  Comedy: comedy,
  "Romance-Comedy": romance,
  Adventure: adventure,
  Horror: horror,
  Romance: romance,
  Animation: animation,
  "Sci-Fi": scifi,
};

const LandingPage = ({ session }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      checkUserRole();
    }
  }, [session]);

  const checkUserRole = async () => {
    if (session) {
      const { data, error } = await supabase
        .from("users")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        return;
      }

      if (data.is_admin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  };

  const handleEnter = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col items-center justify-between p-4 overflow-hidden relative bg-gradient-to-br from-blue-900 to-black text-blue-100"
        >
          <div className="flex-grow flex flex-col items-center justify-center z-10">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-12"
            >
              <motion.img
                src={logo}
                alt="logo"
                className="mx-auto mb-4 w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg"
                whileHover={{ rotate: 360, transition: { duration: 0.7 } }}
                style={{ cursor: "pointer" }}
              />
              <h1 className="text-6xl font-bold mb-4 text-blue-600">
                Cloud Hotstar
              </h1>
              <p className="text-xl mb-8 text-blue-400">
                Jelajahi Dunia Sinema dalam Genggaman Anda
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full max-w-4xl"
            >
              {[
                "Action",
                "Comedy",
                "Romance-Comedy",
                "Adventure",
                "Horror",
                "Romance",
                "Animation",
                "Sci-Fi",
              ].map((genre, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    backgroundImage: `url(${genreImages[genre]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="bg-blue-900/30 p-6 rounded-lg text-center shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-blue-400">
                    {genre}
                  </h3>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
              className="bg-blue-700 text-blue-100 font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors"
              onClick={handleEnter}
            >
              Mulai Jelajahi
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-sm text-blue-400 z-10 mt-8"
          >
            © 2024 Cloud Hotstar. All rights reserved.
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <LoginForm
          onRegisterClick={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      >
        <RegisterForm
          onLoginClick={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      </Modal>
    </>
  );
};

export default LandingPage;
