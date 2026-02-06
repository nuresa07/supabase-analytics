import { sanity } from "@/lib/sanity.cli";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner";

const EditFaqPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    question: "",
    answer: ""
  })
  const [loading, setLoading] = useState(false);
  const [initialFetch, setInitialFetch] = useState(true);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const result = await sanity.getDocument(id!);
        if (!result) throw new Error("FAQ not found");
        console.log("result", result);

        setForm({ question: result.question, answer: result.answer });

      } catch (error) {
        toast.error("Gagal mengambil data FAQ");
        console.error(error);
        navigate("/admin/faq");
      } finally {
        setInitialFetch(false);
      }
    }
    fetchFaq();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      toast.error("Pertanyaan dan jawaban wajib diisi");
      return;
    }

    setLoading(true);
    try {
      await sanity.patch(id!)
        .set({
          question: form.question,
          answer: form.answer
        })
        .commit();

      toast.success("FAQ berhasil diperbarui");
      navigate("/admin/faq");
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error("Gagal memperbarui FAQ");
    } finally {
      setLoading(false);
    }
  }

  if (initialFetch) return <p className="text-center py-4">Loading...</p>

  return (
    <div className="p-4  max-w-xl mx-auto">
      <h1 className=" text-2xl font-bold mb-4">Edit FAQ</h1>

      <div className="space-y-4">
        <div>
          <label className="font-medium">Pertanyaan:</label>
          <input className="w-full rounded-md px-3 py-2 mt-1 border"
            type="text" name="question" value={form.question} onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-medium">Jawaban</label>
          <textarea className="w-full border rounded-md px-3 py-2 mt-1"
            name="answer"
            value={form.answer}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  )
}

export default EditFaqPage