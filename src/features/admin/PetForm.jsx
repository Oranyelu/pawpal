import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { toast } from "react-hot-toast";

const PetForm = ({ onSave, editingPet }) => {
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    description: "",
    image: "",
    status: "available", // default status
  });

  // If editing, load pet details into form
  useEffect(() => {
    if (editingPet) setForm(editingPet);
  }, [editingPet]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Data validation (optional: add your own constraints)
      if (!form.name || !form.breed || !form.image) {
        toast.error("Name, breed, and image are required");
        return;
      }

      await onSave(form); // Pass it to AdminDashboard logic
      setForm({
        name: "",
        breed: "",
        age: "",
        gender: "",
        description: "",
        image: "",
        status: "available",
      });
    } catch (err) {
      toast.error("Failed to save pet");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800">
        {editingPet ? "Edit Pet" : "Add New Pet"}
      </h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Pet Name"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="breed"
        value={form.breed}
        onChange={handleChange}
        placeholder="Breed"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="age"
        value={form.age}
        onChange={handleChange}
        placeholder="Age"
        type="number"
        className="w-full p-2 border rounded"
      />
      <input
        name="gender"
        value={form.gender}
        onChange={handleChange}
        placeholder="Gender"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />
      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="available">Available</option>
        <option value="adopted">Adopted</option>
      </select>

      <button
        type="submit"
        className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800"
      >
        {editingPet ? "Update Pet" : "Add Pet"}
      </button>
    </form>
  );
};

export default PetForm;
