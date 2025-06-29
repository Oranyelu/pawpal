import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";

const dummyPets = [
  {
    id: "1",
    name: "Bella",
    breed: "Golden Retriever",
    age: 2,
    gender: "Female",
    description: "Bella is a sweet and friendly golden retriever who loves belly rubs and long walks in the park.",
    image: "https://images.unsplash.com/photo-1619983081563-430f6a4fa8f6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    name: "Milo",
    breed: "Persian Cat",
    age: 3,
    gender: "Male",
    description: "Milo is a calm and independent cat who enjoys lounging in sunny windows.",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    name: "Rocky",
    breed: "German Shepherd",
    age: 1,
    gender: "Male",
    description: "Rocky is a loyal and energetic pup, ready for training and lots of love.",
    image: "https://images.unsplash.com/photo-1601758123927-196fa7f19f08?auto=format&fit=crop&w=800&q=80"
  }
];

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pet = dummyPets.find((p) => p.id === id);

  if (!pet) {
    return <p className="text-center mt-10">Pet not found.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <img src={pet.image} alt={pet.name} className="w-full md:w-1/2 rounded-2xl shadow-lg" />
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{pet.name}</h1>
            <p className="text-lg text-gray-600 mb-2">
              {pet.breed} • {pet.age} years • {pet.gender}
            </p>
            <p className="text-gray-700 mb-6">{pet.description}</p>
            <button
              onClick={() => navigate(`/adopt/${pet.id}`)}
              className="bg-emerald-700 text-white px-6 py-2 rounded-xl hover:bg-emerald-800"
            >
              Request Adoption
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetDetails;
