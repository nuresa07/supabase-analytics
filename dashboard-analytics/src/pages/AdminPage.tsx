import { supabase } from "@/lib/supabase"
import { getAllUsers, updateUserRole } from "@/redux/slices/adminSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useThemeStore } from "@/stores/ThemeStore"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { FileText, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";


const AdminPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading, updating } = useSelector((state: RootState) => state.admin)

  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const userPerPage = 10

  const { darkMode } = useThemeStore()

  const sections = [
    {
      title: "FAQ Manager",
      description: "Tambah, edit, atau hapus FAQ",
      icon: <HelpCircle className="w-8 h-8 text-blue-600" />,
      link: "/admin/faq",
    },
    {
      title: "Blog Manager",
      description: "Kelola artikel blog",
      icon: <FileText className="w-8 h-8 text-green-600" />,
      link: "/admin/blog",
    },
  ]

  useEffect(() => {
    const fetchUsers = async () => {
      const session = await supabase.auth.getSession();
      const token = session.data?.session?.access_token;

      if (token) {
        dispatch(getAllUsers(token))
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleRoleChange = async (id: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const session = await supabase.auth.getSession();
    const token = session.data?.session?.access_token;

    if (!token) return;

    toast.promise(
      dispatch(updateUserRole({ id, role: newRole, token })),
      {
        loading: "Changing roles...",
        success: "Role changed successfully!",
        error: 'Failed to change role',
      }
    )
  }

  const filteredUsers = users.filter((user) => {
    const email = user.email?.toLowerCase() || "";
    const fullName = user.user_metadata?.full_name?.toLowerCase() || "";
    const query = search.toLowerCase();

    return email.includes(query) || fullName.includes(query);
  })

  // logic pagination
  const totalPages = Math.ceil(filteredUsers.length / userPerPage);
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const getStatusActive = (lastSignIn: string | null) => {
    if (!lastSignIn) return "Offline";

    const last = new Date(lastSignIn);
    const now = new Date();
    const diff = now.getTime() - last.getTime();

    const days = diff / (1000 * 60 * 60 * 24); // konversi ke hari

    return days <= 7 ? "Active" : "Offline";
  }

  return (
    <div className={`p-4 min-h-screen rounded-md shadow-md ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-800'} overflow-x-scroll`}>
      <h1 className="text-2xl font-bold mb-4 border-b-1">Admin Panel</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full sm:w-1/2 px-3 py-2 rounded-lg mb-4 border 
    ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white border-gray-300 text-gray-900"}`}
          />

          <p className="text-sm text-gray-500 mb-2">
            Menampilkan {filteredUsers.length} dari {users.length} user
          </p>

          <Link to="/analytics/add">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4">
              ➕ Tambah Data
            </button>
          </Link>

          <table className={`table-auto overflow-x-auto w-full border mt-5 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
            <thead>
              <tr className={`${darkMode ? "bg-gray-800 text-white border-gray-500" : "bg-white border-gray-300 text-gray-900"}`}>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">update role</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user: any) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border-white border-1">{user.email}</td>
                  <td className="px-4 py-2 border-white border-1">{user.user_metadata?.role || "unknown"}</td>
                  <td className="px-4 py-2 border-white border-1">
                    <button
                      disabled={updating}
                      onClick={() => handleRoleChange(user.id, user.user_metadata?.role)}
                      className={`px-3 py-1 text-white rounded transition cursor-pointer  
                      ${user.user_metadata?.role === "admin"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-blue-500 hover:bg-blue-600"
                        } ${updating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`
                      }
                    >
                      {user.user_metadata?.role === "admin" ? "Jadikan User" : "Jadikan Admin"}
                    </button>
                  </td>
                  <td className="px-4 py-2 border-white border-1">
                    <span
                      title={
                        user.last_sign_in_at
                          ? `Terakhir login: 🕓 ${new Date(user.last_sign_in_at).toLocaleString("id-ID")}`
                          : "⚠️ Belum pernah login"
                      }
                      className={`
      text-xs px-2 py-1 rounded-full font-medium 
      ${getStatusActive(user.last_sign_in_at) === "Active"
                          ? (darkMode ? "bg-green-600 text-white" : "bg-green-500 text-white")
                          : (darkMode ? "bg-red-600 text-white" : "bg-red-500 text-white")
                        }
    `}
                    >
                      {getStatusActive(user.last_sign_in_at)}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${darkMode ? "bg-zinc-700" : "bg-gray-200"} text-sm rounded disabled:opacity-50 `}
        >
          Previous
        </button>

        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm rounded disabled:opacity-50 ${darkMode ? 'bg-zinc-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          Next
        </button>
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-6">Admin CMS Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-6 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-start space-y-4`}
                to={section.link}
              >
                {section.icon}
                <div className="">
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{section.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default AdminPage