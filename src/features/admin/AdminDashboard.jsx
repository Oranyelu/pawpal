import PetTable from "./PetTable";
import PetForm from "./PetForm";
import { useState } from "react";
import Navbar from "../../layouts/Navbar";

const AdminDashboard = () => {
  const [pets, setPets] = useState([]);
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
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <PetForm onSave={handleSave} editingPet={editingPet} />
        <PetTable pets={pets} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default AdminDashboard;
