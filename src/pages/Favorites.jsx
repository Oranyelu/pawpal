import Navbar from "../layouts/Navbar";
import PetCard from "../components/PetCard";
import useFavorites from "../hooks/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">💖 My Favorite Pets</h1>

        {favorites.length === 0 ? (
          <p className="text-gray-500">You haven’t favorited any pets yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
