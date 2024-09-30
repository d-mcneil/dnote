// STYLES
import "./index.css";
// LIBRARIES
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// STATE
import { AuthSessionProvider } from "./auth/AuthSessionContext";
// COMPONENTS
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthSessionProvider>
        <App />
      </AuthSessionProvider>
    </BrowserRouter>
  </StrictMode>
);
