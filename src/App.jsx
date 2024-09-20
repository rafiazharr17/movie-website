import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { supabase } from "./utils/supabaseClient";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        console.log("Session found:", session); // Debugging line
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", session.user.id)
          .single();
        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          console.log("Profile fetched:", profile); // Debugging line
          setIsAdmin(profile.is_admin);
        }
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        console.log("Auth state changed, session:", session); // Debugging line
        const fetchUserRole = async () => {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", session.user.id)
            .single();
          if (error) {
            console.error("Error fetching profile:", error);
          } else {
            console.log("Profile fetched on auth state change:", profile); // Debugging line
            setIsAdmin(profile.is_admin);
          }
        };
        fetchUserRole();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage session={session} />} />
        <Route
          path="/home"
          element={session ? <HomePage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile"
          element={session ? <Profile /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admin"
          element={
            session && isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
