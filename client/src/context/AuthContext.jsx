import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("token") !== null
  );
  const [logoutReason, setLogoutReason] = useState("");

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setLogoutReason("");
    setIsAuthenticated(true);
  };

  const logout = (reason = "User-initiated logout") => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLogoutReason(reason);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logoutReason, setLogoutReason, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
