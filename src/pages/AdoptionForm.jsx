import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      petId: pet.id,
      petName: pet.name,
      adopterEmail: user.email,
      message,
    };

    console.log("📤 Adoption Request:", formData);
    setSubmitted(true);
  };

  if (!pet) {
    return <p className="text-center mt-10">Pet not found.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Adopt {pet.name}</h2>

        {submitted ? (
          <div className="text-green-600 font-medium">
            Your adoption request for <strong>{pet.name}</strong> has been submitted!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Why do you want to adopt {pet.name}?</label>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full p-2 border rounded"
              ></textarea>
            </div>

            <button className="w-full bg-emerald-700 text-white py-2 rounded hover:bg-emerald-800">
              Submit Request
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default AdoptionForm;
