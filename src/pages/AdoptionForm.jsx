import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import supabase from "../services/supabaseClient";
import toast from "react-hot-toast";
import Navbar from "../layouts/Navbar";
import emailjs from "emailjs-com";

const AdoptionForm = () => {
  const { id } = useParams(); // pet ID from URL
  const navigate = useNavigate();
  const { user } = useAuth(); // logged-in user

  const [pet, setPet] = useState(null);
  const [message, setMessage] = useState("");

  // 🔁 Fetch pet details from Supabase
  useEffect(() => {
    const fetchPet = async () => {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Pet not found.");
        console.error(error);
      } else {
        setPet(data);
      }
    };

    fetchPet();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to adopt.");
      return;
    }

    try {
      const { error } = await supabase.from("adoption_requests").insert([
        {
          user_email: user.email,
          pet_id: id,
          message: message,
        },
      ]);

      // ✅ EmailJS notification
      try {
        await emailjs.send(
          "your_service_id",
          "your_template_id",
          {
            to_name: "Admin",
            from_name: user.email,
            message: `Hey Admin, ${user.email} just sent an adoption request for ${pet.name}.`,
          },
          "your_user_public_key"
        );
      } catch (err) {
        console.warn("Email notification failed", err);
      }

      if (error) throw error;

      toast.success(`Adoption request for ${pet.name} sent!`);
      setMessage("");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send adoption request.");
    }
  };

  if (!pet) return <p className="text-center mt-10">Loading pet...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Adopt {pet.name}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />

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
