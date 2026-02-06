// bisa dihapus
import { sanity } from "@/lib/sanity.cli";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateFaqPage = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    question: "",
    answer: ""
  })

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      toast.error("Pertanyaan dan jawaban tidak boleh kosong.");
      return;
    }

    setLoading(true);

    try {
      await sanity.create({
        _type: "faq",
        ...form,
      })

      toast.success("FAQ berhasil ditambahkan.");
      navigate("/admin/faq")
    } catch (error) {
      console.error(error);
      toast.error("Gagal menambahkan FAQ");
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">+ Tambah Faq</h1>

      <div className="space-y-4">
        <div>
          <label className="font-medium">Pertanyaan</label>
          <input className="w-full border rounded-md px-3 py-2 mt-1"
            type="text"
            name="question"
            value={form.question}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-medium">Jawaban</label>
          <textarea className="w-full border rounded-md px-3 py-2 mt-1"
            name="answer"
            value={form.answer}
            onChange={handleChange}
            rows={4}
            placeholder="Masukkan jawaban di sini..."
          >
          </textarea>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>

      </div>
    </div>
  )
}

export default CreateFaqPage