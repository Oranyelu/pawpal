// src/pages/Home.jsx
import PetCard from "../components/PetCard";
import Navbar from "../layouts/Navbar";

const dummyPets = [
  {
    id: "1",
    name: "Bella",
    breed: "Golden Retriever",
    age: 2,
    image: "https://images.unsplash.com/photo-1619983081563-430f6a4fa8f6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    name: "Milo",
    breed: "Persian Cat",
    age: 3,
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    name: "Rocky",
    breed: "German Shepherd",
    age: 1,
    image: "https://images.unsplash.com/photo-1601758123927-196fa7f19f08?auto=format&fit=crop&w=800&q=80"
  }
];

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Meet Your New Best Friend 🐶
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
