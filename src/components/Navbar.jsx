// src/layouts/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-emerald-700">
        PawPal 🐾
      </Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-emerald-600">Home</Link>
        <Link to="/login" className="text-gray-700 hover:text-emerald-600">Login</Link>
        <Link to="/register" className="text-gray-700 hover:text-emerald-600">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
