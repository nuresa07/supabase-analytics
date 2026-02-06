### Dashboard Analytics (`dashboard-analytics/`)
- **Tech Stack**: React, Vite, TypeScript, Redux, Tailwind CSS
- **Fitur Utama**:
  - Analytics visualization (charts & metrics)
  - User authentication (Supabase)
   # Analytics Dashboard — Fullstack Application

  This repository contains a fullstack analytics application that integrates a NestJS backend, a React + Vite frontend dashboard, and a Sanity CMS for content management (blog, FAQ, changelog).

  ## Project Structure

  ```
  supabase/
  ├── backend-analytics/        # API backend (NestJS + TypeScript)
  ├── dashboard-analytics/      # Frontend dashboard (React + Vite)
  ├── cms/                      # Content Management System (Sanity)
  └── README.md
  ```

  ### Backend (`backend-analytics/`)
  - **Stack**: NestJS, TypeScript, Supabase (DB/Auth), Redis
  - **Key features**:
    - Analytics API (CRUD + insights queries)
    - Supabase authentication and RBAC
    - Blog management endpoints
    - Admin endpoints
    - Sanity integration for CMS content
  - **Default port**: 3000

  Quick start:
  ```bash
  cd backend-analytics
  npm install
  npm run start:dev
  ```

  ### Frontend Dashboard (`dashboard-analytics/`)
  - **Stack**: React, Vite, TypeScript, Redux, Tailwind CSS
  - **Key features**:
    - Analytics visualizations (charts, metrics)
    - Authentication (Supabase)
    - Admin UI for managing analytics
    - CMS UI for blog and FAQ management
    - CSV export for data
  - **Default port**: 5173

  Quick start:
  ```bash
  cd dashboard-analytics
  npm install
  npm run dev
  ```

  ### CMS (`cms/`)
  - **Stack**: Sanity Studio
  - **Content types**: Blog posts, FAQ, Authors, Changelog

  Quick start:
  ```bash
  cd cms
  npm install
  npx sanity start
  ```

  ## Quick Start (All services)

  Prerequisites:
  - Node.js 16+ and npm or yarn
  - Supabase account (database and auth)
  - Sanity account (CMS)
  - Redis (optional, for caching)

  Install dependencies per package:
  ```bash
  # From repository root
  cd backend-analytics && npm install
  cd ../dashboard-analytics && npm install
  cd ../cms && npm install
  ```

  Environment variables (create `.env` files for each service):

  `backend-analytics/.env` (example):
  ```
  DATABASE_URL=your_supabase_database_url
  SUPABASE_KEY=your_supabase_service_role_key
  REDIS_URL=redis://localhost:6379
  ```

  `dashboard-analytics/.env` (example):
  ```
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  VITE_SANITY_PROJECT_ID=your_sanity_project_id
  VITE_SANITY_DATASET=production
  VITE_OPENAI_API_KEY=your_openai_key (set locally or in CI)
  ```

  `cms/.env` (example):
  ```
  SANITY_STUDIO_API_PROJECT_ID=your_sanity_project_id
  SANITY_STUDIO_API_DATASET=production
  ```

  Run services:

  Terminal 1 — Backend:
  ```bash
  cd backend-analytics
  npm run start:dev
  ```

  Terminal 2 — Frontend:
  ```bash
  cd dashboard-analytics
  npm run dev
  ```

  Terminal 3 — CMS:
  ```bash
  cd cms
  npx sanity start
  ```

  ## API Overview

  Common endpoints (examples):

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | GET    | `/analytics` | Get all analytics records |
  | POST   | `/analytics` | Create an analytics record |
  | GET    | `/analytics/:id` | Get analytics by ID |
  | PUT    | `/analytics/:id` | Update analytics record |
  | DELETE | `/analytics/:id` | Delete analytics record |
  | GET    | `/blog` | Get blog posts |
  | POST   | `/blog` | Create a blog post |

  Authentication: the backend uses Supabase Authentication (email/password), issues JWTs for API requests, and implements role-based access control for admin endpoints.

  ## Database (Supabase/Postgres)

  Suggested tables:
  - `users` — user profiles
  - `analytics` — analytics data
  - `blog_posts` — CMS content stored in Sanity or mirrored in DB
  - `insights` — precomputed analytics insights

  ## Development Workflow

  Feature branch workflow:
  ```bash
  git checkout -b feature/your-feature
  # make changes
  git add .
  git commit -m "feat: short description"
  git push origin feature/your-feature
  ```

  Create a pull request on GitHub for review and merge.

  ## Tools & Testing

  - Testing: Jest (backend), Vitest (frontend)
  - Linting: ESLint
  - Formatting: Prettier
  - API testing: use `backend-analytics/api_testing/api.rest`

  ## Further Reading

  - See `backend-analytics/README.md` for backend specifics.
  - See `dashboard-analytics/README.md` for frontend specifics.
  - See `cms/` for Sanity schemas.

  ## Contributing

  1. Fork the repo
  2. Create a feature branch
  3. Open a pull request

  ## License

  MIT

  ---
