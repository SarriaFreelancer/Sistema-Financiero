// src/components/ClientForm.tsx
import { useState } from "react";

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
}

export const ClientForm = ({
  onSubmit,
}: {
  onSubmit: (data: ClientFormData) => void;
}) => {
  const [form, setForm] = useState<ClientFormData>({
    name: "",
    email: "",
    phone: "",
  });

  return (
    <div className="bg-gray-800 p-6 rounded-lg space-y-4 max-w-md mx-auto shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-2">Nuevo Cliente</h3>
      
      <div>
        <input
          type="text"
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Nombre completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <input
          type="email"
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div>
        <input
          type="tel"
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-md shadow-md transition-colors"
        onClick={() => onSubmit(form)}
      >
        Crear cliente
      </button>
    </div>
  );
};