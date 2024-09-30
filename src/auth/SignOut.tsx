// LIBRARIES
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// STATE
import { useAuthSession } from "./AuthSessionContext";
// COMPONENTS
import { Loader } from "../components/Loader";
// UTILS
import { supabase } from "../supabaseClient";

export const SignOut = () => {
  const navigate = useNavigate();
  const { session } = useAuthSession();
  useEffect(() => {
    supabase.auth
      .signOut()
      .then(({ error }) => {
        if (error) throw new Error(error?.message);
        // navigate("/auth"); // Not needed because the user is already redirected to the auth page
      })
      .catch(() => (session ? navigate(-1) : navigate("/auth")));
  }, []);
  return <Loader />;
};
