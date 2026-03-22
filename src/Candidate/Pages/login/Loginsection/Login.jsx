import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import API from "/src/api/axios";
import {Link, useNavigate } from "react-router-dom";
import Mosaic from "./Mosaic";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return setError("Email and password required");
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // 🔐 token save
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

    const user = res.data.user;

if (user.onboardingCompleted) {
  navigate("/dashboard");
} else {
  navigate("/profile");
}

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* LEFT */}
      <div className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <p className="text-gray-500 mb-6">
            Find the job made for you!
          </p>

          <button className="w-full flex items-center justify-center gap-2 border rounded-lg py-3 mb-4 hover:bg-gray-50">
            <FcGoogle size={22} />
            Log in with Google
          </button>

          <div className="text-center text-sm text-gray-400 mb-4">
            or Login with Email
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-3 focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-2 focus:ring-2 focus:ring-black"
          />

          <div className="text-right text-sm text-blue-600 mb-4 cursor-pointer">
            Forgot password?
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-90"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="text-center text-sm mt-4">
            Not registered?{" "}
            <span className="text-blue-600 cursor-pointer">
               <Link to="/register?role=candidate" className="text-blue-600">
            Create an account
            </Link>
              
            </span>
          </p>
        </motion.div>
      </div>

      {/* RIGHT */}
      <Mosaic/>
    </div>
  );
};

export default Login;
