import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json"
  }
});

// Funciones de autenticación
export const authApi = {
  login: async (credentials: any) => {
    const { data } = await api.post("/users/login", credentials); 
    return data;
  },
  register: async (userData: any) => {
    const { data } = await api.post("/users/register", userData);
    return data;
  }
};
