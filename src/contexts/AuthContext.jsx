import React, { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      console.warn("Failed to parse saved user");
      return null;
    }
  });

  const signIn = async (email, password) => {
    try {
      const response = await api.post("/api/client/login", { email, password });
      const userData = response.data;
      console.log("Login response data:", userData); // Debugging log
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(
        error.response?.data?.message || "Failed to sign in. Please try again."
      );
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await api.post("/api/client", userData);
      return response.data;
    } catch (error) {
      console.error("Sign up failed:", error);
      throw new Error(
        error.response?.data?.message || "Failed to sign up. Please try again."
      );
    }
  };

  const signOut = async () => {
    try {
      await api.post("/api/client/logout"); // Optional
    } catch (error) {
      console.warn(
        "Sign out failed on the server, clearing local state only.",
        error
      );
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
