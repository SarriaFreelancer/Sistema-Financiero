import { useEffect, useState } from "react";
import { api } from "../api/client";

export const useClients = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getClients = async () => {
    const res = await api.get("/clients");
    setClients(res.data);
    setLoading(false);
  };

  const createClient = async (data: any) => {
    await api.post("/clients", data);
    getClients();
  };

  useEffect(() => {
    getClients();
  }, []);

  return {
    clients,
    loading,
    createClient,
  };
};