import { fetchAnalytics } from "@/redux/slices/analyticsSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useThemeStore } from "@/stores/ThemeStore"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

const ManageAnalyticsPage = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { data, loading } = useSelector((state: RootState) => state.analytics)

  const [selected, setSelected] = useState<string[]>([])

  const toggleSelection = (date: string) => {
    setSelected((prev) =>
      prev.includes(date)
        ? prev.filter((d) => d !== date)
        : [...prev, date]
    )
  }

  const handleSelectAll = () => {
    if (selected.length === data.length) {
      setSelected([])
    } else {
      setSelected(data.map((item) => item.date))
    }
  }

  const handleBulkDelete = async () => {
    const confirm = window.confirm(`Yakin ingin menghapus ${selected.length} data terpilih?`)
    if (!confirm) return

    const { error } = await supabase
      .from('analytics')
      .delete()
      .in("date", selected)

    if (error) {
      toast.error("gagal menghapus data")
      console.error(error)
    } else {
      toast.success("data berhasil dihapus")
      setSelected([])
      dispatch(fetchAnalytics())
    }
  }

  const { darkMode } = useThemeStore()

  const handleDelete = async (date: string) => {
    const confirm = window.confirm(`Yakin ingin menghapus data tanggal ${date}?`)
    if (!confirm) return

    const { error } = await supabase
      .from('analytics')
      .delete()
      .eq("date", date)

    if (error) {
      toast.error("gagal menghapus data")
      console.error(error)
    } else {
      toast.success("data berhasil dihapus")
      dispatch(fetchAnalytics())
    }
  }

  useEffect(() => {
    dispatch(fetchAnalytics())
  }, [dispatch])

  return (
    <div className="p-4 min-h-screen overflow-x-scroll">
      <h1 className="text-2xl font-bold mb-4">Kelola Data Analytics</h1>

      {loading ? (
        <p>loading data...</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Link to="/analytics/add">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4">
                ➕ Tambah Data
              </button>
            </Link>
            {selected.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
              >
                🗑️ Hapus Terpilih ({selected.length})
              </button>
            )}
          </div>

          <table className=" w-full table-auto border overflow-x-scroll">
            <thead className={`${darkMode ? "bg-gray-800 text-white border-gray-500" : "bg-white border-gray-300 text-gray-900"}`}>
              <tr>
                <th className="px-3 py-2 border">Date</th>
                <th className="px-3 py-2 border">Users</th>
                <th className="px-3 py-2 border">Revenue</th>
                <th className="px-3 py-2 border">Conversion</th>
                <th className="px-3 py-2 border">Active User</th>
                <th className="px-3 py-2 border">Session Duration</th>
                <th className="px-3 py-2 border">Actions</th>

                <th className="px-3 py-2 border">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selected.length === data.length}
                  />
                </th>

              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.date}>
                  <td className="px-3 py-2 border">{item.formatted_date}</td>
                  <td className="px-3 py-2 border">{item.users}</td>
                  <td className="px-3 py-2 border">{item.revenue}</td>
                  <td className="px-3 py-2 border">{item.conversion_rate}</td>
                  <td className="px-3 py-2 border">{item.active_users}</td>
                  <td className="px-3 py-2 border">{item.session_duration}</td>
                  <td className="px-3 py-2 border space-x-2">
                    <Link to={`/analytics/edit/${item.date}`}>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded text-sm cursor-pointer">
                        ✏️ Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item.date)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                  <td className="px-3 py-2 border">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.date)}
                      onChange={() => toggleSelection(item.date)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

    </div>
  )
}

export default ManageAnalyticsPage
