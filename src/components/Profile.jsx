import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setEmail(user.email);

      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setUsername(data.username || "");
      }
    };
    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updates = {
        username,
        updated_at: new Date(),
      };

      const { error: profileError } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (profileError) throw profileError;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/home");
    } catch (error) {
      toast({
        title: "Profile update failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="text-blue-800 bg-white p-8 rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Profile
      </h2>
      {error && (
        <p className="text-blue-500 mb-4 text-center bg-blue-100 p-2 rounded">
          {error}
        </p>
      )}
      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="username" className="block mb-2 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
