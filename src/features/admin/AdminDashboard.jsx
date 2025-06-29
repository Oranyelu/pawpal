import { useEffect, useState } from "react";
import Navbar from "../../layouts/Navbar";
import PetTable from "./PetTable";
import PetForm from "./PetForm";
import RequestTable from "./RequestTable";
import supabase from "../../services/supabaseClient";
import { toast } from "react-hot-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("pets");
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPets = async () => {
    const { data, error } = await supabase.from("pets").select("*");
    if (error) {
      toast.error("Failed to fetch pets");
      console.error(error);
    } else {
      setPets(data);
    }
  };

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("adoption_requests")
      .select("id, pet_id, message, created_at, user_email, pets(name)");

    if (error) {
      toast.error("Failed to fetch requests");
      console.error(error);
    } else {
      const transformed = data.map((req) => ({
        id: req.id,
        petName: req.pets?.name || "Unknown",
        userEmail: req.user_email,
        message: req.message,
        createdAt: req.created_at,
      }));
      setRequests(transformed);
    }
  };

  useEffect(() => {
    fetchPets();
    fetchRequests();
  }, []);

  const handleSave = async (petData) => {
    setIsSubmitting(true);
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
      await Promise.all([fetchPets(), fetchRequests()]);
    } catch (err) {
      toast.error("Error saving pet");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (pet) => setEditingPet(pet);

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

        {/* Tabs */}
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

        {/* Tab Content */}
        {activeTab === "pets" ? (
          <>
            {editingPet?.image && (
              <img
                src={editingPet.image}
                alt="Current"
                className="w-32 h-32 object-cover rounded mb-2"
              />
            )}
            <PetForm
              onSave={handleSave}
              editingPet={editingPet}
              isSubmitting={isSubmitting}
            />
            {pets.length === 0 ? (
              <p className="text-gray-500">No pets available yet 🐾</p>
            ) : (
              <PetTable pets={pets} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </>
        ) : (
          <>
            {requests.length === 0 ? (
              <p className="text-gray-500">No adoption requests yet 📨</p>
            ) : (
              <RequestTable requests={requests} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
