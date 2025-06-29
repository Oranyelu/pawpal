import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PetDetails from "./pages/PetDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./features/admin/AdminDashboard";
import AdoptionForm from "./pages/AdoptionForm";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./features/auth/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pet/:id" element={<PetDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adopt/:id"
        element={
          <ProtectedRoute>
            <AdoptionForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            {user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
