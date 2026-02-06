import { sanity } from "@/lib/sanity.cli";
import { useThemeStore } from "@/stores/ThemeStore";
import { FAQ } from "@/types"
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const FaqAccordion = () => {

  const { darkMode } = useThemeStore()

  const [faqs, setFaqs] = useState<FAQ[]>([])

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await sanity.fetch(`*[_type == "faq"] | order(_createdAt desc)`);
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    }

    fetchFaqs();
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 p-4">
      {faqs.map((faq: any, index: any) => (
        <div className={`border rounded-lg shadow-sm ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}
          key={faq._id}
        >
          <button className={`w-full flex justify-between items-center p-4 font-semibold ${darkMode ? 'text-zinc-200' : 'text-zinc-800 '}`}

            onClick={() => toggle(index)}
          > {/* text-left */}
            <span>{faq.question}</span>
            {openIndex === index
              ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )
            }
          </button>
          {openIndex === index && (
            <>
              <hr className="w-[95%] mx-auto" />
              <div className={`px-4 pb-4  ${darkMode ? 'dark:text-zinc-300' : 'text-zinc-600'}  text-sm`}>
                {faq.answer}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default FaqAccordion
