import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import Navbar from "../layouts/Navbar";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" className="w-full p-2 border rounded" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" className="w-full p-2 border rounded" required />
          <button className="w-full bg-emerald-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
