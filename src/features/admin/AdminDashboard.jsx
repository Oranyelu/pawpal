import { useEffect, useState } from "react";
import Navbar from "../../layouts/Navbar";
import PetTable from "./PetTable";
import PetForm from "./PetForm";
import RequestTable from "./RequestTable";
import { supabase } from "../../supabaseClient"; // Adjust path if needed
import { toast } from "react-hot-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("pets");
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  // 🔁 Fetch pets from Supabase
  const fetchPets = async () => {
    const { data, error } = await supabase.from("pets").select("*");
    if (error) {
      toast.error("Failed to fetch pets");
      console.error(error);
    } else {
      setPets(data);
    }
  };

  // 🔁 Fetch adoption requests from Supabase
  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("adoption_requests")
      .select("*, pets(name), user_email");

    if (error) {
      toast.error("Failed to fetch requests");
      console.error(error);
    } else {
      const transformed = data.map((req) => ({
        id: req.id,
        petName: req.pets?.name ?? "Unknown",
        userEmail: req.user_email,
        message: req.message,
        createdAt: req.created_at,
      }));
      setRequests(transformed);
    }
  };

  // 🔁 Fetch both on load
  useEffect(() => {
    fetchPets();
    fetchRequests();
  }, []);

  // 💾 Save or update pet
  const handleSave = async (petData) => {
    try {
      if (editingPet) {
        const { error } = await supabase
          .from("pets")
          .update(petData)
          .eq("id", editingPet.id);

        if (error) throw error;
        toast.success("Pet updated!");
      } else {
        const { error } = await supabase.from("pets").insert([petData]);
        if (error) throw error;
        toast.success("Pet added!");
      }

      setEditingPet(null);
      fetchPets();
    } catch (err) {
      toast.error("Error saving pet");
      console.error(err);
    }
  };

  // ✏️ Edit Pet
  const handleEdit = (pet) => setEditingPet(pet);

  // 🗑 Delete pet
  const handleDelete = async (id) => {
    const { error } = await supabase.from("pets").delete().eq("id", id);
    if (error) {
      toast.error("Error deleting pet");
    } else {
      toast.success("Pet deleted");
      fetchPets();
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        {/* 🧭 Tab Switcher */}
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "pets"
                ? "bg-emerald-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("pets")}
          >
            Manage Pets
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "requests"
                ? "bg-emerald-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            View Requests
          </button>
        </div>

        {/* 📦 Tab Content */}
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
