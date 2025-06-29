import { useState } from "react";
import PetCard from "../components/PetCard";
import Navbar from "../layouts/Navbar";

const dummyPets = [
  {
    id: "1",
    name: "Bella",
    breed: "Golden Retriever",
    age: 2,
    status: "available",
    location: "Enugu",
    image:
      "https://images.unsplash.com/photo-1619983081563-430f6a4fa8f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Milo",
    breed: "Persian Cat",
    age: 3,
    status: "adopted",
    location: "Lagos",
    image:
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Rocky",
    breed: "German Shepherd",
    age: 1,
    status: "available",
    location: "Abuja",
    image:
      "https://images.unsplash.com/photo-1601758123927-196fa7f19f08?auto=format&fit=crop&w=800&q=80",
  },
];

const Home = () => {
  const [breedFilter, setBreedFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [location, setLocation] = useState("");

  const filteredPets = dummyPets.filter((pet) => {
    const matchesBreed = breedFilter ? pet.breed === breedFilter : true;
    const matchesStatus = statusFilter ? pet.status === statusFilter : true;
    const matchesLocation = location
      ? pet.location.toLowerCase().includes(location.toLowerCase())
      : true;

    return matchesBreed && matchesStatus && matchesLocation;
  });

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Meet Your New Best Friend 🐶
        </h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <select
            onChange={(e) => setBreedFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Breeds</option>
            <option value="Golden Retriever">Golden Retriever</option>
            <option value="Persian Cat">Persian Cat</option>
            <option value="German Shepherd">German Shepherd</option>
          </select>

          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="adopted">Adopted</option>
          </select>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search by location"
            className="border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
