import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import Navbar from "../layouts/Navbar";
import supabase from "../services/supabaseClient";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [breedFilter, setBreedFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      const { data, error } = await supabase.from("pets").select("*");
      if (!error) setPets(data);
    };
    fetchPets();
  }, []);

  const filteredPets = pets.filter((pet) => {
    const matchesBreed = breedFilter ? pet.breed === breedFilter : true;
    const matchesStatus = statusFilter ? pet.status === statusFilter : true;
    const matchesLocation = location
      ? pet.location?.toLowerCase().includes(location.toLowerCase())
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
            {/* You can dynamically render breed options from fetched pets */}
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
