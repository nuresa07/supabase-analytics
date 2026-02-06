# Analytics Dashboard - Fullstack Application

Aplikasi fullstack yang mengintegrasikan backend NestJS, frontend React, dan CMS Sanity untuk mengelola analytics, blog, FAQ, dan changelog.

## 📁 Struktur Proyek

```
supabase/
├── backend-analytics/        # API Backend (NestJS)
├── dashboard-analytics/      # Frontend Dashboard (React + Vite)
├── cms/                      # Content Management System (Sanity)
└── README.md
```

### Backend Analytics (`backend-analytics/`)
- **Tech Stack**: NestJS, TypeScript, Supabase, Redis
- **Fitur Utama**:
  - API untuk analytics (CRUD, query insights)
  - Autentikasi dengan Supabase
  - Blog management (CRUD blog posts)
  - Admin dashboard endpoints
  - Integrasi Sanity untuk CMS content
- **Port**: Default 3000

**Setup:**
```bash
cd backend-analytics
npm install
npm run start:dev
```

### Dashboard Analytics (`dashboard-analytics/`)
- **Tech Stack**: React, Vite, TypeScript, Redux, Tailwind CSS
- **Fitur Utama**:
  - Analytics visualization (charts & metrics)
  - User authentication (Supabase)
  - Admin panel untuk manage analytics
  - Blog & FAQ management interface
  - Changelog viewer
  - CSV export untuk data
- **Port**: Default 5173

**Setup:**
```bash
cd dashboard-analytics
npm install
npm run dev
```

### CMS (`cms/`)
- **Tech Stack**: Sanity Studio
- **Content Types**:
  - Blog Posts
  - FAQ (Frequently Asked Questions)
  - Authors
  - Changelog entries
- **Access**: Sanity Studio interface

**Setup:**
```bash
cd cms
npm install
npx sanity start
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ dan npm/yarn
- Supabase account (untuk database & auth)
- Sanity account (untuk CMS)
- Redis server (untuk caching)

### 1. Clone & Install Dependencies

```bash
# Clone repository
git clone <repo-url>
cd supabase

# Install semua dependencies
npm install --workspace
# atau install per folder:
cd backend-analytics && npm install
cd ../dashboard-analytics && npm install
cd ../cms && npm install
```

### 2. Setup Environment Variables

Buat file `.env` di masing-masing folder:

**`backend-analytics/.env`:**
```
DATABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
REDIS_URL=redis://localhost:6379
```

**`dashboard-analytics/.env`:**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
```

**`cms/.env`:**
```
SANITY_STUDIO_API_PROJECT_ID=your_sanity_project_id
SANITY_STUDIO_API_DATASET=production
```

### 3. Run Aplikasi

**Terminal 1 - Backend:**
```bash
cd backend-analytics
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd dashboard-analytics
npm run dev
```

**Terminal 3 - CMS:**
```bash
cd cms
npx sanity start
```

## 📊 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/analytics` | Ambil semua analytics |
| POST | `/analytics` | Buat analytics baru |
| GET | `/analytics/:id` | Ambil analytics by ID |
| PUT | `/analytics/:id` | Update analytics |
| DELETE | `/analytics/:id` | Hapus analytics |
| GET | `/blog` | Ambil semua blog posts |
| POST | `/blog` | Buat blog post baru |
| GET | `/admin` | Admin dashboard data |

## 🔐 Authentication

Aplikasi menggunakan **Supabase Authentication**:
- User registration via email/password
- JWT tokens untuk API requests
- Role-based access control (RBAC) di admin panel

## 🗄️ Database Schema

Supabase dengan PostgreSQL:
- `users` - User profiles
- `analytics` - Analytics data
- `blog_posts` - Blog content
- `insights` - Analytics insights

## 📝 Git Workflow

```bash
# Checkout feature branch
git checkout -b feature/nama-fitur

# Commit dengan pesan deskriptif
git commit -m "feat: deskripsi fitur"

# Push ke remote
git push origin feature/nama-fitur

# Buat pull request untuk review
```

## 🛠️ Development Tools

- **Testing**: Jest (backend), Vitest (frontend)
- **Linting**: ESLint
- **Formatting**: Prettier
- **API Testing**: REST client (`backend-analytics/api_testing/api.rest`)

## 📚 Dokumentasi Lebih Lanjut

- [Backend README](./backend-analytics/README.md)
- [Frontend README](./dashboard-analytics/README.md)
- [CMS README](./cms/README.md)

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - lihat file LICENSE untuk detail

---

**Created with ❤️ for analytics & content management**
