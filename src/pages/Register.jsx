import { useState } from "react";
import supabase from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your inbox to confirm account");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Create an Account</h2>
      <input
        type="email"
        className="w-full border p-2 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full border p-2 rounded"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-emerald-600 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
