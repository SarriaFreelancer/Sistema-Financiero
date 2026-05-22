import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { useCurrentClientId } from "./useCurrentClientId";

export const useExpenses = () => {
  const clientId = useCurrentClientId();

  return useQuery({
    queryKey: ["expenses", clientId],

    queryFn: async () => {
      const { data } = await api.get("/expenses", {
        params: { clientId },
      });

      return data;
    },

    enabled: !!clientId,
  });
};
