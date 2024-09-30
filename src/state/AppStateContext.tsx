// LIBRARIES
import { createContext, ReactNode, useContext } from "react";
// TYPES
import { Page } from "../types/types";
// STATE
import { usePageState } from "./usePageState";
import { withInitialState } from "./withInitialState";

type AppStateContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType
);

type AppStateProviderProps = {
  children: ReactNode;
  initialState: Page;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }: AppStateProviderProps) => {
    const state = usePageState(initialState);
    return (
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    );
  }
);

export const useAppState = () => useContext(AppStateContext);
