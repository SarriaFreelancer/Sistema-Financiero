import { ClientTable } from "../components/ClientTable";
import { ClientForm } from "../components/ClientForm";
import { useClients } from "../hooks/useClients";

export const Clients = () => {
  const { clients, createClient, loading } = useClients();

  return (
    <div className="text-white space-y-4">
      <h1 className="text-3xl font-bold">Clientes</h1>

      <ClientForm onSubmit={createClient} />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ClientTable clients={clients} />
      )}
    </div>
  );
};