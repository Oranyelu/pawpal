import PetTable from "./PetTable";
import PetForm from "./PetForm";
import RequestTable from "./RequestTable";
import { useState } from "react";
import Navbar from "../../layouts/Navbar";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("pets");
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([
    {
      id: "1",
      petName: "Milo",
      userEmail: "jane@example.com",
      message: "He's perfect for my home!",
      createdAt: Date.now(),
    },
    {
      id: "2",
      petName: "Luna",
      userEmail: "david@me.com",
      message: "My kids love Luna already!",
      createdAt: Date.now() - 86400000,
    },
  ]);

  const [editingPet, setEditingPet] = useState(null);

  const handleSave = (newPet) => {
    if (editingPet) {
      setPets(pets.map((pet) => (pet.id === newPet.id ? newPet : pet)));
      setEditingPet(null);
    } else {
      setPets([...pets, { ...newPet, id: Date.now().toString() }]);
    }
  };

  const handleEdit = (pet) => setEditingPet(pet);
  const handleDelete = (id) => setPets(pets.filter((pet) => pet.id !== id));

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        {/* Tab Switcher */}
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === "pets" ? "bg-emerald-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("pets")}
          >
            Manage Pets
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "requests" ? "bg-emerald-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("requests")}
          >
            View Requests
          </button>
        </div>

        {/* Content */}
        {activeTab === "pets" ? (
          <>
            <PetForm onSave={handleSave} editingPet={editingPet} />
            <PetTable pets={pets} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        ) : (
          <RequestTable requests={requests} />
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
