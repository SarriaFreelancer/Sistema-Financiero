// src/components/ClientTable.tsx
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const ClientTable = ({ clients }: { clients: Client[] }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <table className="w-full text-white">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((c) => (
            <tr key={c.id} className="border-b border-gray-800">
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};