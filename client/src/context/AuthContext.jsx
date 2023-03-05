import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("token") !== null
  );

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
