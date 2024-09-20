import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { motion } from "framer-motion";
import { useToast } from "@chakra-ui/react";

const RegisterForm = ({ onLoginClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [registerAttempts, setRegisterAttempts] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (cooldownUntil) {
      const timer = setInterval(() => {
        const now = new Date();
        if (now >= cooldownUntil) {
          setCooldownUntil(null);
          setRegisterAttempts(0);
          setError(null);
        } else {
          const remainingTime = Math.ceil((cooldownUntil - now) / 1000);
          setError(
            `Too many registration attempts. Please try again in ${remainingTime} seconds.`
          );
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [cooldownUntil]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (cooldownUntil && new Date() < cooldownUntil) {
      return;
    }

    // Password validation
    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      return;
    } else {
      setPasswordError("");
    }

    try {
      setRegisterAttempts((prev) => prev + 1);

      if (registerAttempts >= 3) {
        const cooldownTime = new Date(new Date().getTime() + 5 * 60000); // 5 minutes cooldown
        setCooldownUntil(cooldownTime);
        toast({
          title: "Too many attempts",
          description:
            "Too many registration attempts. Please try again in 5 minutes.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      console.log("Attempting to sign up user...");
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: email.split("@")[0], // Use part of email as initial username
          },
        },
      });
      if (error) {
        console.error("Signup error:", error);
        throw error;
      }
      console.log("User signed up successfully:", data);
      console.log("Email confirmation status:", data.user.confirmation_sent_at);

      // Remove the manual profile creation as it will be handled by the trigger
      /*
      console.log("Attempting to add user to profiles table...");
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email,
        is_admin: false,
        updated_at: new Date(),
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        throw profileError;
      }
      console.log("User profile created successfully");
      */

      toast({
        title: "Registration successful",
        description:
          "Your account has been created. Please check your email to confirm your registration.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setRegisterAttempts(0);
      setCooldownUntil(null);
      setRegistrationSuccess(true);

      // Remove the onLoginClick() call here
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (registrationSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-blue-800 bg-white p-8 rounded-lg shadow-2xl text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-600">
          Registration Successful!
        </h2>
        <p className="mb-6">
          Please check your email to confirm your registration.
        </p>
        <button
          onClick={onLoginClick}
          className="bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go to Login
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-blue-800 bg-white p-8 rounded-lg shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Register</h2>
      {error && (
        <p className="text-blue-500 mb-4 text-center bg-blue-100 p-2 rounded">
          {error}
        </p>
      )}
      <form onSubmit={handleRegister} className="space-y-6">
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
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Register
        </button>
      </form>
      <p className="mt-6 text-center">
        Already have an account?{" "}
        <button
          onClick={onLoginClick}
          className="text-blue-600 hover:underline font-semibold"
        >
          Login
        </button>
      </p>
    </motion.div>
  );
};

export default RegisterForm;
