
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("user_id") ? true : false
  );

  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem("isAdmin") === "true"
  );

  const login = (userId, adminStatus) => {
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
    sessionStorage.setItem("user_id", userId);
    sessionStorage.setItem("isAdmin", adminStatus);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    sessionStorage.clear();
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");
    const adminStatus = sessionStorage.getItem("isAdmin") === "true";

    if (userId) {
      setIsLoggedIn(true);
      setIsAdmin(adminStatus);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);