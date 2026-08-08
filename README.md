# KodaTask App — Client Project Tracker

A modern, production-grade full-stack project tracking application built for digital agencies to manage client deliverables, track status progression, filter priorities, and manage team access.

---

## 📋 Technology Choices

### Frontend Stack
* **React 19 + TypeScript + Vite**: Chosen for fast build times, instant HMR during development, and strict type safety across components and API models.
* **TanStack Query (`@tanstack/react-query` v5)**: Manages server state, automatic query caching, background refetching, and pagination state without boilerplate code or race conditions.
* **React Hook Form + Zod**: Provides type-safe form validation with zero unneeded component re-renders.
* **Tailwind CSS v4 + Lucide Icons**: Provides responsive, accessible, utility-first styling with modern UI micro-animations and status/priority badges.
* **Vitest + React Testing Library + jsdom**: Modern component and hook unit testing.

### Backend Stack
* **Node.js 22 (ES Modules) + Express.js**: Simple, asynchronous, lightweight REST API framework.
* **Prisma 7 ORM + SQLite**: Type-safe database queries. Configured with the native `prisma-adapter-node-sqlite` driver adapter to utilize Node.js's built-in `node:sqlite` engine, eliminating native C++ compilation (`node-gyp`) dependencies.
* **JWT (`jsonwebtoken`) + Password Hashing (`bcryptjs`)**: Secure token-based authentication and salted password storage.
* **Zod**: Strict request payload and query string validation middleware.
* **Vitest**: Fast, ESM-native unit testing runner.

### DevOps & Infrastructure
* **Docker & Docker Compose**: Automated container building and runtime orchestration for zero-setup execution.

---

## 💡 Assumptions Made

1. **Authentication Scope**: The assessment specifies role-based access for agency project managers. A default pre-seeded admin user (`admin@agency.com` / `password123`) is generated upon database initialization for instant testing.
2. **Database Choice**: SQLite was chosen as the primary database to ensure zero-configuration setup for reviewers while providing full relational database capabilities via Prisma ORM.
3. **Date Validation Rules**:
   - `startDate` cannot be set in the past at creation time.
   - `dueDate` cannot be set earlier than `startDate`.
   - Frontend date pickers dynamically enforce minimum allowed dates to prevent user entry errors.
4. **Pagination Layout**: Default page size is set to 6 projects per page to maintain an optimal grid layout across desktop and mobile devices without excessive scrolling.

---

## 🚀 Key Features

* **Project Management**: Create, edit, view details, and delete client projects.
* **JWT Authentication**: Secure login flow with persistent session storage, profile context, and protected API routes.
* **Discovery & Filtering**:
  * Case-insensitive instant search by Client Name or Project Name.
  * Status filtering (`Planning`, `In Progress`, `On Hold`, `Completed`).
  * Priority level filtering (`Low`, `Medium`, `High`).
  * Sorting options (Newest First, Due Date Earliest/Latest, Start Date, Project Name A-Z, Business Priority High->Low).
  * Server-side & client-side paginated grid layout (6 projects per page).
* **Strict Date Validations**: Enforces start/due date logic on both backend Zod schemas and frontend inputs.
* **Docker Ready**: One-command containerized launch for frontend, backend, and persistent SQLite storage (`docker compose up`).
* **Complete Unit Testing**: Comprehensive test suites using Vitest across controllers, services, middlewares, UI components, and hooks.

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
│   │   ├── lib/                  # Prisma client setup
│   │   ├── middleware/           # Auth, Validation, Error middlewares & __tests__
│   │   ├── routes/               # API route definitions
│   │   ├── schemas/              # Zod validation schemas & __tests__
│   │   ├── services/             # Prisma data access services & __tests__
│   │   └── utils/                # JWT & Password utilities & __tests__
│   ├── app.ts                    # Express app setup
│   ├── server.ts                 # Server entrypoint
│   ├── tsconfig.json
│   └── package.json
└── frontend/                     # React Vite Single Page Application
    ├── Dockerfile                # Frontend container definition
    ├── .dockerignore
    ├── src/
    │   ├── components/           # UI elements & Project components & __tests__
    │   ├── context/              # AuthContext & __tests__
    │   ├── hooks/                # Custom TanStack Query hooks & __tests__
    │   ├── lib/                  # Axios & QueryClient setup
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

## ⚙️ Getting Started & Setup Instructions

### Prerequisites
* **Node.js**: v22 LTS or higher recommended
* **npm**: v9 or higher
* **Docker & Docker Compose** (Optional)

---

## 🏃 How to Run the Application

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

Run both services in isolated containers with automatic database migration and seeding:

```bash
docker compose up --build
```

- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

To stop containers:
```bash
docker compose down -v
```

---

## 🧪 Running Unit Tests

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

## 📝 Technical Reflection

### 1. Why did you choose this implementation approach?
- **Decoupled Architecture**: Separating the Express REST API and React SPA guarantees clean boundary separation, allowing the backend services and frontend clients to evolve independently.
- **Declarative Server State Management**: Using TanStack Query on the frontend eliminated manual `useEffect` data fetching patterns, providing built-in caching, background revalidation, and loading/fetching state differentiation.
- **Portable Native ORM Integration**: Leveraging Prisma 7 with the `prisma-adapter-node-sqlite` driver adapter allowed us to utilize Node.js's built-in `node:sqlite` module. This removed external C++ build tool dependencies (`node-gyp`), making local setup and Docker builds instantly runnable across operating systems.

### 2. What tradeoffs did you make?
- **SQLite vs. PostgreSQL**: SQLite was selected for portability and zero-configuration review. While PostgreSQL offers greater concurrent write performance, SQLite is optimal for single-node assessment environments.
- **Native Driver Adapter Choice**: Using `prisma-adapter-node-sqlite` over `better-sqlite3` eliminated native build tool requirements on Windows/macOS/Linux containers, trading a slight raw I/O margin for universal cross-platform compatibility.
- **In-Memory Priority Sorting**: Because SQLite does not natively support custom enum sorting orders in SQL queries, we implemented custom priority weight sorting (`High (1) -> Medium (2) -> Low (3)`) in the service layer prior to pagination slicing.

### 3. What would you improve if given additional time?
- **Role-Based Access Control (RBAC)**: Expand user roles beyond `ADMIN` to include `CLIENT` (read-only project view) and `PROJECT_MANAGER` (full management).
- **Activity & Audit Logging**: Track project edits and deletion history with user IDs and timestamps.
- **End-to-End (E2E) Testing**: Implement Playwright tests covering critical user flows (login -> project creation -> search filter -> status update -> deletion).
- **Real-Time Updates**: Integrate WebSockets (Socket.io) or Server-Sent Events (SSE) so multi-user dashboard changes update dynamically without manual refetching.

### 4. What was the most challenging part of this assessment?
- **Cross-Environment SQLite Compatibility & Prisma 7 Driver Adapters**: Prisma 7 introduced mandatory driver adapters for database connections. Resolving compatibility between Node.js 22, Prisma 7, and native compilation requirements on Windows required transitioning from `better-sqlite3` to `prisma-adapter-node-sqlite` to eliminate `node-gyp` C++ toolchain issues.
- **Priority-Based Sorting & Pagination Sync**: Ensuring custom business priority sorting (`High -> Medium -> Low`) interacted seamlessly with search filtering, status filtering, and server-side pagination boundaries required careful service-level ordering.

### 5. Did you use AI tools during development?
**Yes.**
- **Which tools?**: Antigravity AI Assistant (Claude Opus / Gemini Flash models).
- **How were they used?**:
  - *Architecture & Scaffolding*: Assisting in structuring modular Express controllers/services and TanStack Query custom hooks.
  - *Testing Suite Creation*: Generating comprehensive unit test cases using Vitest and React Testing Library for edge cases (date validations, query parameter coercions, middleware error handling).
  - *Troubleshooting & Refactoring*: Diagnosing native compilation errors with native C++ modules and refactoring the Prisma database layer to use Node's native SQLite driver adapter.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
