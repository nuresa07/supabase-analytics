import { useEffect, useState } from "react";
import { signIn, signInWithGithub, signInWithGoogle } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { supabase } from "../lib/supabase";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        navigate("/dashboard"); // Jika user sudah login, arahkan ke dashboard
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) {
      alert(error.message);
    } else {
      alert("Login successful!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-700">
          <LogIn className="mr-2 text-blue-500" /> Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border p-3 pl-10 text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border p-3 pl-10 text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
        <div className="flex gap-2 mt-3">
          <button onClick={signInWithGoogle} className="cursor-pointer flex items-center justify-center space-x-2 w-full rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600 transition-all">
            <span>Sign In with</span>
            <div>
              <FcGoogle className="w-5 h-5" />
            </div>
          </button>
          <button onClick={signInWithGithub} className="cursor-pointer flex items-center justify-center space-x-2 w-full rounded-md bg-blue-500 p-3 text-white hover:bg-blue-600 transition-all">
            <span>Sign In with</span>
            <div>
              <AiFillGithub className="w-5 h-5" />
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
