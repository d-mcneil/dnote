// LIBRARIES
import { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
// UTILS
import { supabase } from "../supabaseClient";

type AuthSessionContextValue = {
  session: Session | null;
  isAuthenticationLoading: boolean;
  user: User | undefined;
};

const AuthSessionContext = createContext<AuthSessionContextValue>(
  {} as AuthSessionContextValue
);

export const AuthSessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticationLoading, setIsAuthenticationLoading] =
    useState<boolean>(true);

  const { user } = session ?? {};

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthenticationLoading(false);
    });
    const auth = async () => {
      setIsAuthenticationLoading(true);
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
      } catch (error) {
        setSession(null);
      } finally {
        setIsAuthenticationLoading(false);
      }
    };
    auth();
  }, []);

  return (
    <AuthSessionContext.Provider
      value={{ session, isAuthenticationLoading, user }}
    >
      {children}
    </AuthSessionContext.Provider>
  );
};

export const useAuthSession = () => useContext(AuthSessionContext);
