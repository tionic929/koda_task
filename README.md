# KodaTask App — Client Project Tracker

A modern, production-grade full-stack project tracking application built for digital agencies to manage client deliverables, track status progression, filter priorities, and manage team access.

---

## 🚀 Key Features

* **Project Management**: Create, edit, view details, and soft/hard delete client projects.
* **JWT Authentication**: Secure login flow with persistent session storage, profile context, and protected API routes.
* **Discovery & Filtering**:
  * Case-insensitive instant search by Client Name or Project Name.
  * Status filtering (`Planning`, `In Progress`, `On Hold`, `Completed`).
  * Priority level filtering (`Low`, `Medium`, `High`).
  * Sorting options (Newest First, Due Date Earliest/Latest, Start Date, Project Name A-Z, Business Priority High->Low).
  * Server-side & client-side paginated grid layout (6 projects per page).
* **Strict Date Validations**:
  * `startDate` cannot be set in the past.
  * `dueDate` cannot be earlier than `startDate`.
  * Real-time bounds enforcement on input date pickers.
* **Docker Ready**: One-command containerized launch for frontend, backend, and persistent SQLite storage (`docker compose up`).
* **100% Test Coverage**: Full modular unit test suites using Vitest, React Testing Library, and jsdom.

---

## 🛠️ Tech Stack

### Frontend
* **Core**: React 19 + TypeScript + Vite
* **State & Data Fetching**: TanStack Query (`@tanstack/react-query` v5) + Axios
* **Form & Validation**: React Hook Form + Zod
* **Styling**: Tailwind CSS v4 + Lucide Icons
* **Testing**: Vitest + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom`

### Backend
* **Runtime**: Node.js 22 (ES Modules)
* **Framework**: Express.js
* **ORM & Database**: Prisma 7 + SQLite (`dev.db`) via native `prisma-adapter-node-sqlite`
* **Auth & Security**: JWT (`jsonwebtoken`) + Password Hashing (`bcryptjs`)
* **Validation**: Zod + custom Express middleware
* **Testing**: Vitest

### DevOps & Infrastructure
* **Containerization**: Docker + Docker Compose (`docker-compose.yml`)

---

## 📁 Repository Structure

```text
KodaTask App/
├── docker-compose.yml            # Docker Compose orchestration
├── BusinessReqs/                 # Specifications & requirements docs
├── backend/                      # Express REST API Server
│   ├── Dockerfile                # Backend container definition
│   ├── .dockerignore
│   ├── .env.example              # Environment variables template
│   ├── prisma/
│   │   ├── schema.prisma         # Prisma data models (User, Project)
│   │   ├── prisma.config.ts      # Prisma 7 configuration
│   │   └── seed.ts               # Database seeder (Admin user + projects)
│   ├── src/
│   │   ├── controllers/          # Express route controllers & __tests__
│   │   ├── lib/                  # Prisma client initialization
│   │   ├── middleware/           # Auth, Validation, Error middlewares & __tests__
│   │   ├── routes/               # API route definitions
│   │   ├── schemas/              # Zod validation schemas & __tests__
│   │   ├── services/             # Prisma data access services & __tests__
│   │   └── utils/                # JWT & Password hashing utilities & __tests__
│   ├── app.ts                    # Express app setup
│   ├── server.ts                 # Server startup entrypoint
│   ├── tsconfig.json
│   └── package.json
└── frontend/                     # React Vite Single Page Application
    ├── Dockerfile                # Frontend container definition
    ├── .dockerignore
    ├── src/
    │   ├── components/           # UI elements & Project components & __tests__
    │   ├── context/              # AuthContext & __tests__
    │   ├── hooks/                # Custom TanStack Query hooks & __tests__
    │   ├── lib/                  # Axios & QueryClient configuration
    │   ├── pages/                # ProjectsPage, ProjectDetailsPage, Login
    │   ├── services/             # Frontend API services & __tests__
    │   ├── test/                 # Vitest setup configuration
    │   └── types/                # TypeScript interfaces
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig.json
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
* **Node.js**: v22 LTS or higher recommended
* **npm**: v9 or higher
* **Docker & Docker Compose** (Optional, for containerized run)

---

## 🚀 Running the Project

### Option A: Local Development (Without Docker)

1. **Clone Repository**:
   ```bash
   git clone https://github.com/tionic929/koda_task.git
   cd "KodaTask App"
   ```

2. **Setup & Start Backend**:
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma db push
   npm run seed
   npm run dev
   ```
   *Backend server runs at:* `http://localhost:5000`

3. **Setup & Start Frontend** (In a new terminal window):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *Frontend app runs at:* `http://localhost:5173`

---

### Option B: Docker Compose (One-Command Run)

Run both the frontend and backend in isolated containers with automated database seeding:

```bash
docker compose up --build
```

- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

To stop and remove containers:
```bash
docker compose down -v
```

---

## 🧪 Running Unit Tests

Both frontend and backend include modularized, standalone Vitest test suites.

### Backend Tests
Runs 12 test suites covering utilities, Zod schemas, middlewares, services, and controllers (42 unit tests):
```bash
cd backend
npm test
```

### Frontend Tests
Runs 11 test suites covering API services, UI components, project cards, forms, filters, hooks, and AuthContext (31 unit tests):
```bash
cd frontend
npm test
```

---

## 🔐 Default Credentials

The database seeder initializes a default administrator account:

* **Email**: `admin@agency.com`
* **Password**: `password123`

---

## 🌐 API Reference

Base URL: `http://localhost:5000/api`

### Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | No |
| `GET` | `/api/auth/me` | Fetch active user profile | Yes (`Bearer <token>`) |

### Project Endpoints (`/api/projects`)
| Method | Endpoint | Description | Validation / Query |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projects` | Fetch paginated projects list | `search`, `status`, `priority`, `sortBy`, `sortOrder`, `page`, `limit` |
| `GET` | `/api/projects/:id` | Fetch project details by ID | Valid `:id` string |
| `POST` | `/api/projects` | Create a new client project | Validated via `createProjectSchema` |
| `PUT` | `/api/projects/:id` | Update existing project | Validated via `updateProjectSchema` |
| `DELETE` | `/api/projects/:id` | Delete project by ID | Valid `:id` string |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
