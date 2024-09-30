// LIBRARIES
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
// STATE
import { useAuthSession } from "./AuthSessionContext";
// COMPONENTS
import { Loader } from "../components/Loader";

export const Private = ({
  component = <Loader />,
  isRoot = false,
}: {
  component?: ReactElement;
  isRoot?: boolean;
}) => {
  const { session, isAuthenticationLoading, user } = useAuthSession();

  if (isAuthenticationLoading) return <Loader />;

  if (session) {
    if (isRoot && user) return <Navigate to={`/start-${user?.id}`} />;
    return component;
  }

  return <Navigate to="/auth" />;
};
