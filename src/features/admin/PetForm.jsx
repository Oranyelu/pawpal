import { useEffect, useState } from "react";
import supabase from "../../services/supabaseClient";
import { toast } from "react-hot-toast";

const PetForm = ({ onSave, editingPet }) => {
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    description: "",
    image: "",
    status: "available",
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingPet) {
      setForm(editingPet);
    }
  }, [editingPet]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    setUploading(true);
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("pet-images")
      .upload(fileName, imageFile);

    setUploading(false);

    if (error) {
      toast.error("Image upload failed");
      console.error(error);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("pet-images").getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.breed) {
      toast.error("Name and breed are required");
      return;
    }

    try {
      let imageUrl = form.image;

      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (!uploadedUrl) return; // stop if upload fails
        imageUrl = uploadedUrl;
      }

      await onSave({ ...form, image: imageUrl });

      setForm({
        name: "",
        breed: "",
        age: "",
        gender: "",
        description: "",
        image: "",
        status: "available",
      });

      setImageFile(null);
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

      {editingPet?.image && (
        <div className="mb-2">
          <p className="text-sm text-gray-500">Current Image:</p>
          <img
            src={editingPet.image}
            alt="Current Pet"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}

      <input
        type="file"
        onChange={handleImageChange}
        className="w-full p-2 border rounded"
        accept="image/*"
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
        disabled={uploading}
      >
        {uploading
          ? "Uploading..."
          : editingPet
          ? "Update Pet"
          : "Add Pet"}
      </button>
    </form>
  );
};

export default PetForm;
