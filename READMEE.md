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

#Requisitos

- Node.js 18+
- MySQL
- npm
- Instalación
  
# 1. Clonar el repositorio

- git clone <url-del-repositorio>
- cd <nombre-del-proyecto>

# 2. Configurar el backend

- cd backend
- npm install
- Crear el archivo .env en la carpeta backend/:

- DATABASE_URL="mysql://usuario:password@localhost:3306/finance_db"
- PORT=3001
  
# 3. Preparar Prisma

- npx prisma generate
- npx prisma migrate dev --name init
- Si prefieres sincronizar directo con la base de datos existente:

- npx prisma db push
- npx prisma generate
  
# 4. Ejecutar el backend

- npm run dev
- El backend queda disponible en:

- http://localhost:3001
  
# 5. Configurar el frontend

- En otra terminal:

- cd frontend
- npm install

# 6. Ejecutar el frontend

- npm run dev

3 El frontend queda disponible en:

- http://localhost:5173
- Scripts
  
# Backend

- npm run dev
  
# Frontend

- npm run dev
- npm run build
- npm run preview
  
# Funcionalidades

Autenticación
Registro de usuario
Inicio de sesión
Persistencia de sesión en localStorage
Dashboard
Balance general
Total de ingresos
Total de gastos
Gráfica mensual
Ingresos y gastos
Crear registros desde modal
Selección de categoría por tipo
Notificaciones visuales al guardar
Actualización automática de datos
Categorías
Crear categorías
Editar categorías
Eliminar categorías
Listado separado por:
Gastos
Ingresos
Reportes
Resumen financiero
Descarga en Excel .xls
Exportación a Excel
Desde la sección de reportes se genera un archivo .xls con:

Resumen financiero
Datos mensuales
Modelo de arquitectura
Este proyecto no usa un MVC puro.

Backend
routes
controllers
Prisma como capa de acceso a datos
Frontend
SPA con componentes, hooks y contexto
En la práctica, es una arquitectura por capas con frontend separado.

Base de datos
Entidades principales:

User
Client
Category
Income
Expense
Mejoras futuras
Filtros por fecha
Exportación a PDF
Paginación en tablas
Roles de usuario
Gráficas por categoría
Más hojas en el Excel exportado
Autor
Sistema desarrollado para gestión financiera personalizada por usuario.

Proyecto académico de gestión financiera por cliente con visualización de datos.
