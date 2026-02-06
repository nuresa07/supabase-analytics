import Chatbot from '@/(components)/Chatbot';
import { signOut } from '@/lib/auth';
import { useEffect, useState } from 'react'
import { BarChart, Home, Menu, Moon, Sun, User, X, ShieldCheck, Database } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { supabase } from '@/lib/supabase';
import { useThemeStore } from '@/stores/ThemeStore';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { clearRole, markRoleLoaded, setRole } from '@/redux/slices/authSlice';


const DashboardLayout = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ email: string | null; avatar_url: string | null }>({ email: null, avatar_url: null })
  const [isChackingSession, setIsChackingSession] = useState(true);
  const { darkMode, toggleDarkMode } = useThemeStore()
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>()

  const { role } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (!data?.session) {
          navigate("/login")
        }

        const user = data.session?.user

        if (user && !user.user_metadata?.role) {
          await supabase.auth.updateUser({
            data: { role: "user" }
          });
        }

        const role = data?.session?.user?.user_metadata?.role

        if (role) {
          dispatch(setRole(role));
        } else {
          dispatch(markRoleLoaded()); // ✅ penting agar gak kejebak loading
        }

      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsChackingSession(false)
      }
    }

    checkSession();

    // Listener untuk menangani perubahan sesi secara real-time
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login")
      }
    })

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, [navigate])

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser({
          email: data.user.email ?? null,
          avatar_url: data.user.user_metadata?.avatar_url || "https://api.dicebear.com/6.x/identicon/svg?seed=user"
        })
      }
      if (error) console.error("Error fatching user: ", error)
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    await signOut();
    dispatch(clearRole())
    navigate("/login");
  };

  if (isChackingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500" />
      </div>
    );
  }

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
      {/* Navbar */}
      <nav className={`flex justify-between p-4 items-center shadow-md w-full h-16 fixed top-0 left-0 right-0 px-4 z-50 ${darkMode ? "bg-gray-900" : "bg-white"} `}>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <h1 className="text-xl font-bold">Dashboard Analytics</h1>
        <div className="flex items-center justify-center space-x-4">
          <button onClick={toggleDarkMode}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="rounded-md font-bold items-center justify-center bg-blue-500 px-2 py-1 hover:bg-blue-600 transition-all text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar & Content */}
      <div className="flex relative">
        {/* Sidebar */}
        <aside className={clsx(
          "fixed w-64 h-screen top-16 left-0 p-4 shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? `absolute top-0 left-0 h-screen translate-x-0 z-10 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}` : "-translate-x-full",
          "md:translate-x-0",
          darkMode ? "bg-gray-800 text-white" : "bg-gray-90 text-gray-900"
          // sampe sini
        )}>
          {/* <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-white md:hidden">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button> */}

          {/* Avatar & User Info */}
          <div className="flex flex-col items-center space-y-2 pb-4 border-b">
            <img className="w-14 h-14 rounded-full transition-opacity duration-300" src={user.avatar_url || "https://api.dicebear.com/6.x/identicon/svg?seed=user"} alt="Avatar" />
            <p className="font-semibold">{user.email || "Guest"}</p>
          </div>

          <ul className="mt-4 space-y-2">
            <li
              className={clsx(
                "py-1 px-1 rounded-md font-semibold transition-all",
                location.pathname === "/dashboard" ? "bg-blue-600 text-white" : "hover:bg-blue-600 hover:text-white"
              )}
            >
              <Link to="/dashboard" className="flex items-center space-x-2">
                <Home className="w-5 h-5" /> <span>Home</span>
              </Link>
            </li>
            <li
              className={clsx(
                "py-1 px-1 rounded-md font-semibold transition-all",
                location.pathname === "/analytics" ? "bg-blue-600 text-white" : `hover:bg-blue-600 hover:text-white`
              )}
            >
              <Link to="/analytics" className="flex items-center space-x-2">
                <BarChart className="w-5 h-5" /> <span>Analytics</span>
              </Link>
            </li>
            <li
              className={clsx(
                "py-1 px-1 rounded-md font-semibold transition-all",
                location.pathname === "/profile" ? "bg-blue-600 text-white" : `hover:bg-blue-600 hover:text-white`
              )}
            >
              <Link to="/profile" className="flex items-center space-x-2">
                <User className="w-5 h-5" /> <span>Profile</span>
              </Link>
            </li>
            {role === 'admin' && (
              <li
                className={clsx(
                  "py-1 px-1 rounded-md font-semibold transition-all",
                  location.pathname === "/admin" ? "bg-blue-600 text-white" : `hover:bg-blue-600 hover:text-white`
                )}
              >
                <Link to="/admin" className='flex items-center space-x-2'>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Admin Panel</span>
                </Link>
              </li>
            )}
            <li
              className={clsx(
                "py-1 px-1 rounded-md font-semibold transition-all",
                location.pathname === "/analytics/manage" ? "bg-blue-600 text-white" : `hover:bg-blue-600 hover:text-white`
              )}
            >
              <Link to="/analytics/manage" className='flex items-center space-x-2'>
                <Database className="w-5 h-5" />
                <span>manage data</span>
              </Link>
            </li>
          </ul>
        </aside>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 md:hidden z-9"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Constent */}
        {/* <main className={`flex-1 p-6 h-full ${isOpen ?? "z-8"} w-full md:pl-70 pt-18`} > */}
        <main className={`flex-1 p-6 h-full w-full md:pl-70 pt-18`} >
          <Outlet />
        </main>
      </div>
      <Chatbot darkMode={darkMode} />
    </div>
  )
}

export default DashboardLayout