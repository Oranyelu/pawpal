import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const toggleFavorite = (pet) => {
    const exists = favorites.find((p) => p.id === pet.id);
    const updated = exists
      ? favorites.filter((p) => p.id !== pet.id)
      : [...favorites, pet];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;
