import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { useCurrentClientId } from "./useCurrentClientId";

export type Category = {
  id: number;
  name: string;
  type: string;
};

export const useCategories = (type?: "income" | "expense") => {
  const clientId = useCurrentClientId();

  return useQuery<Category[]>({
    queryKey: ["categories", clientId, type ?? "all"],
    queryFn: async () => {
      const { data } = await api.get("/categories", {
        params: {
          clientId,
          ...(type ? { type } : {}),
        },
      });

      return data;
    },
    enabled: !!clientId,
  });
};
