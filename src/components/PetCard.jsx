import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";

const PetCard = ({ pet }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.id === pet.id);

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* 💖 Favorite Button */}
      <button
        onClick={() => toggleFavorite(pet)}
        className="absolute top-2 right-2 text-2xl"
        aria-label="Add to favorites"
      >
        {isFavorited ? "❤️" : "🤍"}
      </button>

      <img
        src={pet.image}
        alt={pet.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-bold">{pet.name}</h3>
        <p className="text-sm text-gray-600">{pet.breed}</p>
        <p className="text-sm text-gray-500">{pet.age} years old</p>
        {pet.location && (
          <p className="text-sm text-gray-400 italic">📍 {pet.location}</p>
        )}
        <p
          className={`mt-1 inline-block text-xs font-semibold px-2 py-1 rounded-full ${
            pet.status === "available"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {pet.status}
        </p>

        <Link
          to={`/pet/${pet.id}`}
          className="block mt-4 px-4 py-2 bg-emerald-600 text-white text-center rounded-lg text-sm hover:bg-emerald-700"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
