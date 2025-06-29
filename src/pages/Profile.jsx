import { useEffect, useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import supabase from "../services/supabaseClient";
import Navbar from "../layouts/Navbar";

const Profile = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from("adoption_requests")
        .select("*")
        .eq("user_email", user.email)
        .order("created_at", { ascending: false });

      if (!error) setRequests(data);
    };

    fetchRequests();
  }, [user.email]);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">My Adoption Requests</h2>

        {requests.length === 0 ? (
          <p>You haven’t made any requests yet.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li key={req.id} className="border p-4 rounded shadow">
                <p>
                  <strong>Pet ID:</strong> {req.pet_id}
                </p>
                <p>
                  <strong>Message:</strong> {req.message}
                </p>
                <p className="text-sm text-gray-500">
                  Sent: {new Date(req.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Profile;
