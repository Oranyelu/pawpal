import { useState, useEffect } from "react";

const PetForm = ({ onSave, editingPet }) => {
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    if (editingPet) setForm(editingPet);
  }, [editingPet]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ name: "", breed: "", age: "", gender: "", description: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold">{editingPet ? "Edit Pet" : "Add New Pet"}</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Pet Name" className="w-full p-2 border rounded" required />
      <input name="breed" value={form.breed} onChange={handleChange} placeholder="Breed" className="w-full p-2 border rounded" required />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className="w-full p-2 border rounded" required />
      <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" className="w-full p-2 border rounded" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
      <button type="submit" className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800">
        {editingPet ? "Update Pet" : "Add Pet"}
      </button>
    </form>
  );
};

export default PetForm;
