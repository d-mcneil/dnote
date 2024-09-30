// STYLES
import styles from "./styles/Auth.module.css";
// LIBRARIES
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
} from "@supabase/supabase-js";
// STATE
import { useAuthSession } from "./AuthSessionContext";
// COMPONENTS
import { Loader } from "../components/Loader";
// UTILS
import { supabase } from "../supabaseClient";

type AuthHandler = () => Promise<AuthResponse | AuthTokenResponsePassword>;
type AuthCredentials = {
  email: string;
  password: string;
};

export const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { session } = useAuthSession();
  if (session) return <Navigate to="/" />;

  const credentials: AuthCredentials = {
    email,
    password,
  };

  const handleAuthEvent = async (
    authHandler: AuthHandler,
    successAlertText?: string,
    errorAlertText?: string
  ) => {
    if (!email || !password) return alert("Email and password are required.");
    setIsLoading(true);
    try {
      const { error }: { error: AuthError | null } = await authHandler();
      if (error) throw error;
      else if (successAlertText) alert(successAlertText);
    } catch (error) {
      if (errorAlertText) alert(errorAlertText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInUser = () =>
    handleAuthEvent(
      () => supabase.auth.signInWithPassword(credentials),
      "",
      "Invalid login credentials"
    );

  const handleSignUpUser = () =>
    handleAuthEvent(
      () => supabase.auth.signUp(credentials),
      "Check your email for a confirmation link.",
      "Invalid sign up credentials. Password must be at least 8 characters long with at least one uppercase letter, one lowercase letter, one number, and one special character."
    );

  const handleDemoUser = () => navigate("/start-demo");

  /* */
  // const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     setIsLoading(true);
  //     const { error } = await supabase.auth.signInWithOtp({ email });
  //     if (error) throw error;
  //     else alert("Magic link sent! Check your email.");
  //   } catch (error) {
  //     alert(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // return (
  //   <div className={styles.centeredFlex}>
  //     <div>
  //       <h1>ZTM Notes App</h1>
  //       <p>Sign in with a magic link</p>
  //       {isLoading ? (
  //         "Sending magic link..."
  //       ) : (
  //         <form onSubmit={handleLogin}>
  //           <label htmlFor="email">Email</label>
  //           <input
  //             type="email"
  //             id="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             placeholder="Enter your email"
  //           />
  //           <button>Send magic link</button>
  //         </form>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div className={styles.container}>
      <div className={styles["image-wrapper"]}>
        <img src="./dnote.jpg" className={styles.image} />
        <img src="./dnote-logo.jpg" alt="Dnote Logo" className={styles.logo} />
      </div>
      {isLoading ? (
        <Loader className={styles.loader} />
      ) : (
        <form className={styles.form}>
          <p className={styles.headline}>React + TypeScript Notes App</p>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={styles.input}
          />
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={styles.input}
          />
          <div className={styles["button-wrapper"]}>
            <button
              type="button"
              onClick={handleSignUpUser}
              className={styles.button}
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={handleSignInUser}
              className={styles.button}
            >
              Sign in
            </button>
          </div>
          <button
            type="button"
            className={styles.demo}
            onClick={handleDemoUser}
          >
            Sign in as demo user
          </button>
        </form>
      )}
    </div>
  );
};
