import { useAuth } from "../context/AuthContext";

export const useCurrentClientId = () => {
  const { user } = useAuth();
  return user?.clientId ?? user?.id ?? null;
};
