import { formItem } from "@/constants"
import { supabase } from "@/lib/supabase"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

const EditAnalyticsPage = () => {

  const { date } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('analytics')
        .select("*")
        .eq("date", date)
        .single()

      if (error) {
        toast.error("gagal fetch data")
        return
      }

      setForm(data)
      setLoading(false)
    }

    fetch()

  }, [date])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from("analytics")
      .update({
        users: +form.users,
        revenue: +form.revenue,
        session_duration: +form.session_duration,
        active_users: +form.active_users,
        conversion_rate: +form.conversion_rate
      })
      .eq("date", date)

    if (error) {
      toast.error("Gagal update data")
      console.error("Error updating analytics:", error)
    } else {
      toast.success("Berhasil update!")
      navigate("/analytics/manage")
    }
  }

  if (loading) return <p className="p-4">Loading data...</p>

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Edit data Analitics ({date})</h1>

      <form onSubmit={handleSubmit} className=""> {/* space-y-4 max-w-xl*/}
        {formItem.map((field) => (
          <div key={field}>
            <label className="block ">{field.replace("_", " ")}</label>
            <input
              name={field}
              type="number"
              value={form?.[field] ?? ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border border-gray-300"
            />
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
          Simpan Perubahan
        </button>

      </form>

    </div>
  )
}

export default EditAnalyticsPage
