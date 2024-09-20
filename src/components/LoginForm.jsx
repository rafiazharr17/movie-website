import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const LoginForm = ({ onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (cooldownUntil) {
      const timer = setInterval(() => {
        const now = new Date();
        if (now >= cooldownUntil) {
          setCooldownUntil(null);
          setLoginAttempts(0);
          setError(null);
        } else {
          const remainingTime = Math.ceil((cooldownUntil - now) / 1000);
          setError(
            `Too many login attempts. Please try again in ${remainingTime} seconds.`
          );
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [cooldownUntil]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (cooldownUntil && new Date() < cooldownUntil) {
      return;
    }

    try {
      setLoginAttempts((prev) => prev + 1);

      if (loginAttempts >= 5) {
        const cooldownTime = new Date(new Date().getTime() + 5 * 60000); // 5 minutes cooldown
        setCooldownUntil(cooldownTime);
        toast({
          title: "Too many attempts",
          description:
            "Too many login attempts. Please try again in 5 minutes.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      if (!data || !data.user) {
        throw new Error("Login successful, but user data is missing.");
      }

      console.log("Login data:", data); // Debugging line

      // Fetch user profile to check if admin
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", data.user.id)
        .single();

      if (profileError) throw profileError;

      toast({
        title: "Login successful",
        description: `Welcome back, ${profile.is_admin ? "Admin" : "User"}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setLoginAttempts(0);
      setCooldownUntil(null);

      if (profile.is_admin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
      toast({
        title: "Login failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-blue-800 bg-white p-8 rounded-lg shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Login
      </h2>
      {error && (
        <p className="text-blue-500 mb-4 text-center bg-blue-100 p-2 rounded">
          {error}
        </p>
      )}
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-center">
        Don't have an account?{" "}
        <button
          onClick={onRegisterClick}
          className="text-blue-600 hover:underline font-semibold"
        >
          Register
        </button>
      </p>
    </motion.div>
  );
};

export default LoginForm;
