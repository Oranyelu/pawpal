import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../services/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getProfile = async (sessionUser) => {
    if (!sessionUser) {
      setUser(null);
      return;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", sessionUser.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error.message);
      setUser({ ...sessionUser, role: "user" }); // default fallback
    } else {
      setUser({ ...sessionUser, role: profile?.role || "user" });
    }
  };

  useEffect(() => {
    // Fetch initial session
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await getProfile(session?.user);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      getProfile(session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
