import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
// import { FaqAccordion } from "@/component/cms";
import { useThemeStore } from "@/stores/ThemeStore";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { faqs, testimonials } from "@/constants";


const LandingPage = () => {

  const [isChackingSession, setIsChackingSession] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  const navigate = useNavigate()

  const { darkMode, toggleDarkMode } = useThemeStore()

  useEffect(() => {

    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (data?.session) {

          navigate("/dashboard")

          await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: data.session.access_token })
          })
            .then((res) => res.json())
            .then((data) => console.log("User verified:", data))
            .catch((err) => console.error("Error verifying user:", err));
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
      if (session) {
        navigate("/dashboard")
      }
    })

    return () => {
      authListener.subscription.unsubscribe();
    }

  }, [navigate])


  if (isChackingSession) return null;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">  {/*  */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/70 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/public/images/logo.jpg"
            alt="MyPremiumApp Logo"
            className="w-10 h-10 object-contain rounded"
          />
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 transition cursor-pointer font-medium py-2 px-4 rounded-md text-white">LOGIN</Link>
          <Link to="/register" className="bg-blue-500 hover:bg-blue-600 transition cursor-pointer font-medium py-2 px-4 rounded-md text-white">REGISTER</Link>
          <button onClick={toggleDarkMode}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between max-w-screen-xl  mx-auto px-6 py-20">
        <div className="flex-1 text-center md:text-left">


          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
          >
            Bangun Masa Depan dengan <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Premium App</span>
          </motion.h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
            Solusi modern untuk bisnis Anda, cepat, elegan, dan bertenaga AI.
          </p>

          <motion.div>
            <button className="px-8 py-4 rounded-xl text-lg bg-gradient-to-r from-blue-600 to-blue-400 
                        hover:from-blue-700 hover:to-blue-500 transition font-semibold text-white 
                        shadow-lg hover:shadow-blue-400/40 hover:scale-105 animate-[fadeIn_2.5s_ease-in-out]">
              Coba Gratis
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 
                px-5 py-3 rounded-lg inline-block shadow-md"

          >
            🎉 Hanya 50 pendaftar pertama bulan ini!
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-1 mt-10 md:mt-0 md:ml-12"
        >
          <img
            src="/public/images/landing-page-hero.jpg"
            alt="App Preview"
            className="rounded-2xl shadow-xl"
          />
        </motion.div>
      </section>

      <section className="py-20 bg-background">
        <div className="black max-w-screen-xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold mb-12"
          >
            Kenapa <span className="text-blue-500">Premium App</span>?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className={`p-6 rounded-2xl shadow-lg bg-card border dark:border-blue-800`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://img.icons8.com/ios-filled/100/000000/artificial-intelligence.png"
                alt="AI"
                className={`w-16 mx-auto mb-4 ${darkMode ? "bg-blue-950 rounded" : ""}`}
              />
              <h3 className="text-xl font-semibold mb-2">Bertenaga AI</h3>
              <p className="text-muted-foreground">
                Otomatisasi bisnis Anda dengan teknologi AI terkini untuk hasil maksimal.
              </p>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 rounded-2xl shadow-lg bg-card border dark:border-blue-800"
            >
              <img src="https://img.icons8.com/ios-filled/100/000000/speed.png"
                alt="Fast"
                className={`w-16 mx-auto mb-4 ${darkMode ? "bg-blue-950 rounded" : ""}`}
              />
              <h3 className="text-xl font-semibold mb-2">Cepat & Handal</h3>
              <p className="text-muted-foreground">
                Infrastruktur modern menjamin kecepatan akses dan performa aplikasi.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 rounded-2xl shadow-lg bg-card border dark:border-blue-800"
            >
              <img src="https://img.icons8.com/ios-filled/100/000000/lock-2.png" alt="Secure" className={`w-16 mx-auto mb-4 ${darkMode ? "bg-blue-950 rounded" : ""}`} />
              <h3 className="text-xl font-semibold mb-2">Aman & Terpercaya</h3>
              <p className="text-muted-foreground">
                Data Anda terenkripsi dengan standar keamanan enterprise-grade.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-4`}>Apa kata mereka ? </h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-12`}>
            Dipercaya oleh banyak profesional dan bisnis modern
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonials, i) => (
              <motion.div
                className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-2xl shadow`}
              >
                <img className="w-16 h-16 rounded-full mx-auto mb-4"
                  src={testimonials.img} alt={testimonials.name}
                />
                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} italic mb-4`}>
                  "{testimonials.text}"
                </p>
                <h4 className={`${darkMode ? "text-white" : "text-gray-900"} font-semibold`}>
                  {testimonials.name}
                </h4>
                <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
                  {testimonials.role}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <section className={`relative bg-gradient-to-r  ${darkMode ? "from-blue-800 via-indigo-900 to-purple-900" : "from-blue-500 via-indigo-600 to-purple-600"}  text-white py-24`}>
        {/* Pattern halus */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-75"></div>

        <div className="relative z-10 container mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Siap Tingkatkan Bisnis Anda?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Bergabunglah bersama ratusan pengguna lain yang sudah merasakan manfaat{" "}
            <span className="font-bold">Premium App</span>. Cepat, elegan, dan bertenaga AI.
          </p>
          <button className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 animate-[fadeIn_2.5s_ease-in-out]">
            Mulai Gratis Sekarang 🚀
          </button>
        </div>
      </section>

      <section className={`py-20 bg-gradient-to-r  ${darkMode ? "from-blue-950 via-indigo-900 to-purple-800" : "from-blue-400 via-indigo-400 to-purple-400"}`}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-10 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-4">
            {faqs.map(({ answer, question }, i) => (
              <div className={`border ${darkMode ? "border-gray-700" : "border-gray-200"} rounded-lg`} key={i}>
                <button className={`w-full flex justify-between items-center p-4 text-left text-lg font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}
                  onClick={() => toggleFAQ(i)}
                >
                  {question}
                  <span>{openIndex === i ? "-" : "+"}</span>
                </button>
                {openIndex === i && (
                  <div className={`p-4 ${darkMode ? " text-gray-300" : "text-gray-800"}`}>
                    {answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <motion.footer
        className={`mt-16 border-t ${darkMode ? "border-gray-800 bg-gray-950" : 'border-gray-200 bg-white'} `}
      >
        <div className={`max-w-7xl mx-auto border-red-500 border-1 px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8`}>
          {/* Brand */}
          <div className="border">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>ESaaS</h3>
            <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} >
              Membangun solusi modern yang membantu bisnis Anda berkembang.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'textgray-700'}`}>Menu</h4>
            <ul className="border">test</ul>
          </div>
        </div>
      </motion.footer>

    </div >
  )
}

export default LandingPage
// <section className={`py-12 ${darkMode ? "bg-zinc-900 text-white" : "bg-gray-100"} border-1 border-black`}>
//   <h2 className="text-3xl font-bold text-center mb-8 ">Pertanyaan Umum</h2>
//   <FaqAccordion />
// </section>