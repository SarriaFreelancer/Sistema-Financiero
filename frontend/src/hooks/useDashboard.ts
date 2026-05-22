import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { useCurrentClientId } from "./useCurrentClientId";

export const useDashboard = () => {
  const clientId = useCurrentClientId();

  return useQuery({
    queryKey: ["dashboard", clientId],

    queryFn: async () => {
      const { data } = await api.get("/dashboard", {
        params: { clientId },
      });

      return data;
    },

    enabled: !!clientId,
  });
};
