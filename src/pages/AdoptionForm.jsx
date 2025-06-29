import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import toast from "react-hot-toast";
import Navbar from "../layouts/Navbar";

const dummyPets = [
  {
    id: "1",
    name: "Bella"
  },
  {
    id: "2",
    name: "Milo"
  },
  {
    id: "3",
    name: "Rocky"
  }
];

const AdoptionForm = () => {
  const { id } = useParams();
  const pet = dummyPets.find(p => p.id === id);
  const { user } = useAuth();

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      petId: pet.id,
      petName: pet.name,
      adopterEmail: user.email,
      message,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage mock DB
    const existing = JSON.parse(localStorage.getItem("adoption_requests") || "[]");
    localStorage.setItem("adoption_requests", JSON.stringify([...existing, newRequest]));

    toast.success(`Request to adopt ${pet.name} sent!`);
    setMessage("");
  };

  if (!pet) return <p className="text-center mt-10">Pet not found.</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Adopt {pet.name}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={user.email} disabled className="w-full p-2 border rounded bg-gray-100" />
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder={`Why do you want to adopt ${pet.name}?`}
            className="w-full p-2 border rounded"
          />
          <button className="w-full bg-emerald-700 text-white py-2 rounded hover:bg-emerald-800">
            Submit Request
          </button>
        </form>
      </div>
    </>
  );
};

export default AdoptionForm;
