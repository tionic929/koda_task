# Client Project Tracker

A full-stack web application designed for digital agencies to track client projects, monitor status progression, and manage project priorities.

Built with **Node.js, Express, Prisma 7, and SQLite** on the backend, and **React, TanStack Query, React Hook Form, and Tailwind CSS v4** on the frontend.

---

## Features

* **Project Management**: View, create, edit, and delete client projects.
* **Status Tracking**: Categorize projects by status (`Planning`, `In Progress`, `On Hold`, `Completed`).
* **Priority Management**: Set urgency level (`Low`, `Medium`, `High`).
* **Strict Date Rules**:
  * `startDate` cannot be set in the future.
  * `dueDate` cannot be set in the past.
  * `dueDate` must be on or after `startDate`.
* **Zero Race Conditions**: TanStack Query distinguishes `isLoading` (initial fetch skeleton) from `isFetching` (background syncing indicator).
* **Accessible Modals**: Built using React's `createPortal` rendering overlays directly to `document.body`.
* **Database Seeder**: Pre-populates 50 realistic project records out-of-the-box.

---

## Tech Stack

### Frontend
* **Framework**: React 19 + Vite
* **State & Fetching**: TanStack Query (`@tanstack/react-query`) + Axios
* **Form Handling**: React Hook Form + Zod
* **Styling**: Tailwind CSS v4
* **Icons**: Lucide React

### Backend
* **Runtime**: Node.js (ES Modules)
* **API Framework**: Express
* **Database ORM**: Prisma 7 + SQLite (`file:./dev.db`)
* **Driver Adapter**: `@prisma/adapter-better-sqlite3`
* **Validation**: Zod

---

## Repository Structure

```text
KodaTask App/
├── BusinessReqs/            # Business & technical specification documents
│   ├── REQUIREMENTS.md      # Core business requirements overview
│   ├── API_SPECIFICATION.md # REST API endpoint specifications
│   ├── UI_SPECIFICATION.md  # Frontend UI design guidelines
│   └── TECHNICAL_AND_BONUS.md # Technical stack & bonus roadmap
├── backend/                 # Node.js Express REST API server
│   ├── prisma/              # Prisma schema, configuration, & seed script
│   │   ├── schema.prisma
│   │   └── seed.ts          # Populates 50 random projects
│   ├── src/
│   │   ├── controllers/     # Express route handlers
│   │   ├── middleware/      # Zod validation & error handling
│   │   ├── routes/          # API route definitions
│   │   ├── schemas/         # Backend Zod validation schemas
│   │   └── services/        # Prisma data access layer
│   ├── app.ts               # Express configuration
│   └── server.ts            # HTTP server entrypoint
└── frontend/                # React Vite SPA
    ├── src/
    │   ├── assets/          # Project images & logos
    │   ├── components/      # UI & feature components
    │   ├── hooks/           # TanStack Query custom hooks
    │   ├── lib/             # Axios & QueryClient configuration
    │   ├── pages/           # Main view pages
    │   ├── services/        # Frontend HTTP API services
    │   └── types/           # TypeScript interfaces
    └── index.html
```

---

## Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** (v9 or higher)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tionic929/koda_task.git
   cd "KodaTask App"
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   npx prisma db push
   npx prisma generate
   npm run seed
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

---

## Running the Application

Launch both servers in separate terminal windows:

### Terminal 1: Backend Server (Port 5000)
```bash
cd backend
npm run dev
```
*Backend runs at: `http://localhost:5000`*

### Terminal 2: Frontend App (Port 5173)
```bash
cd frontend
npm run dev
```
*Frontend runs at: `http://localhost:5173`*

---

## API Reference

Base URL: `http://localhost:5000/api`

### Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | No |
| `GET` | `/api/auth/me` | Fetch currently authenticated user profile | Yes (Bearer Token) |

### Project Endpoints (`/api/projects`)
| Method | Endpoint | Description | Validation |
| :--- | :--- | :--- | :--- |
| `GET` | `/projects` | Retrieve all projects | — |
| `GET` | `/projects/:id` | Retrieve project details | Valid `:id` |
| `POST` | `/projects` | Create a new project | `clientName`, `projectName`, `startDate <= today`, `dueDate >= today`, `dueDate >= startDate` |
| `PUT` | `/projects/:id` | Update an existing project | Valid `:id` & Zod validation |
| `DELETE` | `/projects/:id` | Delete a project | Valid `:id` |

---

## Detailed Business Requirements

For complete business requirements and design specifications, refer to the documents in [BusinessReqs](file:///d:/projects/practice/nodeJs/KodaTask%20App/BusinessReqs/REQUIREMENTS.md):
* [REQUIREMENTS.md](file:///d:/projects/practice/nodeJs/KodaTask%20App/BusinessReqs/REQUIREMENTS.md)
* [API_SPECIFICATION.md](file:///d:/projects/practice/nodeJs/KodaTask%20App/BusinessReqs/API_SPECIFICATION.md)
* [UI_SPECIFICATION.md](file:///d:/projects/practice/nodeJs/KodaTask%20App/BusinessReqs/UI_SPECIFICATION.md)
* [TECHNICAL_AND_BONUS.md](file:///d:/projects/practice/nodeJs/KodaTask%20App/BusinessReqs/TECHNICAL_AND_BONUS.md)

---

## License

This project is licensed under the [MIT License](file:///d:/projects/practice/nodeJs/KodaTask%20App/LICENSE).

