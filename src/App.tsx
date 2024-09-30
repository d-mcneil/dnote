/*
// STYLES
// LIBRARIES
// TYPES
// STATE
// COMPONENTS
// UTILS
*/

// LIBRARIES
import { Route, Routes } from "react-router-dom";
// STATE
import { AppStateProvider } from "./state/AppStateContext";
// COMPONENTS
import { Page } from "./Page/components/Page";
import { Auth } from "./auth/Auth";
import { Private } from "./auth/Private";
import { SignOut } from "./auth/SignOut";

export const App = () => (
  <Routes>
    <Route path="/" element={<Private isRoot />} />
    <Route path="/auth" element={<Auth />} />
    <Route
      path="/start-demo"
      element={
        <AppStateProvider>
          <Page />
        </AppStateProvider>
      }
    />
    <Route
      path="/untitled-demo"
      element={
        <AppStateProvider>
          <Page />
        </AppStateProvider>
      }
    />
    <Route path="/sign-out" element={<Private component={<SignOut />} />} />
    <Route
      path="/:slug"
      element={
        <Private
          component={
            <AppStateProvider>
              <Page />
            </AppStateProvider>
          }
        />
      }
    />
  </Routes>
);
