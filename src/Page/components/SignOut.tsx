// STYLES
import styles from "../styles/SignOut.module.css";
// LIBRARIES
import { useNavigate } from "react-router-dom";

export const SignOut = () => {
  const navigate = useNavigate();
  return (
    <button className={styles.button} onClick={() => navigate("/sign-out")}>
      Sign out
    </button>
  );
};
