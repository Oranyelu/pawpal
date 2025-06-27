// src/components/PetCard.jsx
import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={pet.image}
        alt={pet.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{pet.name}</h3>
        <p className="text-sm text-gray-600">{pet.breed}</p>
        <p className="text-sm text-gray-500">{pet.age} years old</p>
        <Link
          to={`/pet/${pet.id}`}
          className="inline-block mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
