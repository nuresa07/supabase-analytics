import { sanity } from '@/lib/sanity.cli'
import { useThemeStore } from '@/stores/ThemeStore'
import { FAQ } from '@/types'
import { Pencil, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const FaqAdminPage = () => {

  const [faqs, setFaqs] = React.useState<FAQ[]>([])
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate()
  const { darkMode } = useThemeStore()

  const fetchFaqs = async () => {
    try {
      const data = await sanity.fetch(`*[_type == "faq"] | order(_createdAt desc)`)
      setFaqs(data)
    } catch (error) {
      console.error("Failed to fetch FAQs:", error)
      toast.error("Gagal mengambil data FAQ")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Yakin ingin menghapus FAQ ini?");
    if (!confirm) return;

    try {
      await sanity.delete(id);
      toast.success("FAQ berhasil dihapus");
      fetchFaqs(); // refresh data
    } catch (error) {
      toast.error("Gagal menghapus FAQ");
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchFaqs()
  }, [])

  return (
    <div className="p-4 h-lvh">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage FAQ</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={() => navigate('/admin/faq/create')}
        >
          Tambah FAQ</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq._id} className={`border p-4 rounded shadow-sm ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <hr className='w-[90%] my-2' />
                  <p className={`text-sm  ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{faq.answer}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/admin/faq/edit/${faq._id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FaqAdminPage