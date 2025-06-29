import { useAuth } from "../features/auth/AuthContext";
import Navbar from "../layouts/Navbar";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("adoption_requests") || "[]");
    const userRequests = data.filter(req => req.adopterEmail === user.email);
    setRequests(userRequests);
  }, [user.email]);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Hi {user.name}, here are your adoption requests:</h2>

        {requests.length === 0 ? (
          <p className="text-gray-600">No requests yet. Go adopt a furry friend 🐾</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req, index) => (
              <li key={index} className="p-4 bg-white rounded-xl shadow">
                <p className="font-bold">{req.petName}</p>
                <p className="text-sm text-gray-600 mt-1">Message: {req.message}</p>
                <p className="text-xs text-gray-400 mt-2">Sent: {new Date(req.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Profile;
