import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("pawpal_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const login = (email, password) => {
    // Fake user
    const dummyUser = { email, name: "PawPal User", id: 1 };
    setUser(dummyUser);
    localStorage.setItem("pawpal_user", JSON.stringify(dummyUser));
    navigate("/profile");
  };

  const register = (email, password) => {
    const newUser = { email, name: "New PawPal User", id: 2 };
    setUser(newUser);
    localStorage.setItem("pawpal_user", JSON.stringify(newUser));
    navigate("/profile");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pawpal_user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
