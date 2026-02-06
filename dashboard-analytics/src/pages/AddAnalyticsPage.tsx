import { formFields } from '@/constants'
import { supabase } from '@/lib/supabase'
import { useThemeStore } from '@/stores/ThemeStore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddAnalyticsPage = () => {

  const navigate = useNavigate()
  const { darkMode } = useThemeStore()
  const [form, setForm] = useState({
    date: "",
    users: "",
    revenue: "",
    session_duration: "",
    active_users: "",
    conversion_rate: ""
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const session = await supabase.auth.getSession();
    const user = session.data?.session?.user;

    if (!user) {
      toast.error('you are not logged in!')
      return;
    }

    const { error } = await supabase.from('analytics').insert([
      {
        ...form,
        users: +form.users,
        revenue: +form.revenue,
        session_duration: +form.session_duration,
        active_users: +form.active_users,
        conversion_rate: +form.conversion_rate,
        created_by: user.id
      }
    ])

    if (error) {
      toast.error("Failed to add data.");
    } else {
      toast.success("Data analysis successfully added!");
      navigate('/analytics/manage');
    }

  }

  return (
    <div className={`p-6 max-w-xl mx-auto ${darkMode ? 'bg-zinc-900' : 'bg-white'} rounded-lg shadow`} >
      <h1 className="text-2xl font-bold mb-6">Tambah Data Analytics</h1>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {formFields.map(({ label, name, type }) => (
          <div key={name} className=''>
            <label className={`block mb-1 font-medium ${darkMode ?? 'text-white'}`}>{label}</label>
            <input className={`w-full px-3 py-2 border rounded ${darkMode ?? 'bg-zinc-800 text-white'}`}
              type={type}
              name={name}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition`}
          type='submit'
        >
          Add Data
        </button>

      </form>
    </div>
  )
}

export default AddAnalyticsPage