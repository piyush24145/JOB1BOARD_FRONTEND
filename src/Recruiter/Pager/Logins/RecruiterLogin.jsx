import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../api/axios";

const RecruiterLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/recruiter/login", form);
      const { token, user } = res.data;

      // 🔒 recruiter-only check
      if (user.role !== "recruiter") {
        setError("You are not authorized as recruiter");
        return;
      }

      // ✅ save auth
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🚀 redirect to recruiter dashboard
      navigate("/recruiter/RecruiterDashboard", { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center mb-2">
          Recruiter Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/recruiter/register" className="text-blue-600">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RecruiterLogin;
