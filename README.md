# Finance System

Sistema web para gestionar finanzas por usuario autenticado, con control de ingresos, gastos, categorías y reportes exportables a Excel.

## Tecnologías

- Frontend: React, Vite, TypeScript, Tailwind CSS, React Query, Axios, Recharts, SweetAlert2, XLSX
- Backend: Node.js, Express, TypeScript, Prisma, Zod
- Base de datos: MySQL

## Características

- Registro e inicio de sesión de usuarios
- Sesión persistente
- Dashboard financiero con resumen visual
- Gestión de ingresos y gastos
- Gestión de categorías por tipo:
  - Ingresos
  - Gastos
- Edición y eliminación de categorías
- Modales modernos para formularios
- Notificaciones visuales bonitas
- Interfaz responsive para móvil, tablet y escritorio
- Reportes financieros
- Exportación de reportes a Excel `.xls`

## Capturas

> Agrega aquí capturas del sistema si deseas publicarlo en GitHub.

## Estructura

```bash
project-root/
├─ backend/
└─ frontend/
```

⚙️ Requisitos
Node.js 18+
MySQL
npm
📦 Instalación
1. Clonar el repositorio
git clone <url-del-repositorio>
cd finance-system
2. Backend
cd backend
npm install

Crear archivo .env:

DATABASE_URL="mysql://usuario:password@localhost:3306/finance_db"
PORT=3001
3. Prisma
npx prisma generate
npx prisma migrate dev --name init

Si ya tienes base de datos:

npx prisma db push
npx prisma generate
4. Ejecutar backend
npm run dev

📍 Backend:
http://localhost:3001

5. Frontend
cd frontend
npm install
npm run dev

📍 Frontend:
http://localhost:5173

📌 Scripts
Backend
npm run dev
Frontend
npm run dev
npm run build
npm run preview
📊 Funcionalidades
👤 Clientes
Crear clientes
Listar clientes
Relación con ingresos y gastos
💰 Ingresos
Crear ingresos por cliente
Asignar categoría
Visualización en dashboard
💸 Gastos
Crear gastos por cliente
Asignar categoría
Control de egresos
📈 Dashboard
Balance por cliente
Total ingresos
Total gastos
Gráfica mensual
Comparación ingresos vs gastos
🧾 Categorías
Crear categorías
Editar categorías
Eliminar categorías
Separación por tipo (ingreso / gasto)
📄 Reportes
Resumen financiero por cliente
Exportación a Excel (.xls)
Datos mensuales
🏗️ Arquitectura
Backend
Controllers
Routes
Prisma ORM
Validación con Zod
Frontend
SPA con React
Componentes reutilizables
Hooks personalizados
Servicios API
🗄️ Base de datos

Entidades principales:

User
Client
Category
Income
Expense
🚀 Mejoras futuras
Login con JWT
Roles de usuario
Filtros por fecha
Exportación a PDF
Paginación de tablas
Dashboard avanzado por categoría
Gráficas comparativas por cliente
👨‍💻 Autor

Proyecto académico de gestión financiera por cliente con visualización de datos.


