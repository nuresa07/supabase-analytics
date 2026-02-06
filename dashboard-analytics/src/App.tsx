import LandingPage from "./pages/LandingPage";
import { Dashboard, Register, Analytics, Profile, CreateFaqPage, EditFaqPage, FaqAdminPage, BlogDetailPage } from './pages';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.tsx'
import DashboardLayout from "./pages/DashboardLayout.tsx";
import ProtectedRouteAdmin from "./routes/ProtectedRouteAdmin.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import useInitializeAuth from "./hooks/useInitializeAuth.ts";
import AddAnalyticsPage from "./pages/AddAnalyticsPage.tsx";
import ManageAnalyticsPage from "./pages/ManageAnalyticsPage.tsx";
import EditAnalyticsPage from "./pages/EditAnalyticsPage.tsx";
import ChangelogPage from "./pages/changelog/ChangelogPage.tsx";
import BlogListPage from "./pages/cms/blog/BlogListPage.tsx";
import { useThemeStore } from "./stores/ThemeStore.ts";
import { useEffect } from "react";
// import AddAnalyticsPage from "./pages/AddAnalyticsPage.tsx";
// import Testing from "./pages/testing.tsx";

function App() {

  const { darkMode, toggleDarkMode } = useThemeStore()

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = storedTheme === "dark" || (!storedTheme && prefersDark)

    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // update state store supaya icon sinkron
    if (isDark !== darkMode) {
      toggleDarkMode()
    }
  }, [])

  useInitializeAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />

        <Route
          path="/admin"
          element={
            <ProtectedRouteAdmin>
              <AdminPage />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path="admin/faq"
          element={
            <ProtectedRouteAdmin>
              <FaqAdminPage />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path="admin/faq/create"
          element={
            <ProtectedRouteAdmin>
              <CreateFaqPage />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path="admin/faq/edit/:id"
          element={
            <ProtectedRouteAdmin>
              <EditFaqPage />
            </ProtectedRouteAdmin>
          }
        >
        </Route>

        <Route
          path="admin/blog"
          element={
            <ProtectedRouteAdmin>
              <BlogListPage />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path="admin/blog/:slug"
          element={
            <ProtectedRouteAdmin>
              <BlogDetailPage />
            </ProtectedRouteAdmin>
          }
        />

        <Route path="analytics/add" element={<AddAnalyticsPage />} />

        <Route path="analytics/manage" element={<ManageAnalyticsPage />} />
        <Route path="analytics/edit/:date" element={<EditAnalyticsPage />} />
      </Route>
      <Route path="changelog" element={<ChangelogPage />} />


    </Routes>
  );
}

export default App
{/* <Route path="/addAnalyticsPage" element={<AddAnalyticsPage />} /> */ }
{/* <Route path="/testing" element={<Testing />} /> */ }
