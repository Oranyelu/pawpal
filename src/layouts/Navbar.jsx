import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-emerald-700">
        PawPal 🐾
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/profile" className="text-gray-700">Hi, {user.name}</Link>
            <button onClick={logout} className="text-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700">Login</Link>
            <Link to="/register" className="text-gray-700">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
