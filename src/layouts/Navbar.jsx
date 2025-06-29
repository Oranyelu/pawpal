import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import supabase from "../services/supabaseClient";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-emerald-700">
        PawPal 🐾
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/profile" className="text-gray-700">
              Hi, {user.email}
            </Link>

            {/* 👑 Admin-only link */}
            {user?.email === "admin@pawpal.com" && (
              <Link to="/admin" className="text-gray-700">
                Admin
              </Link>
            )}

            <button onClick={handleLogout} className="text-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700">
              Login
            </Link>
            <Link to="/register" className="text-gray-700">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
