import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../../api/axios";

const CreateJob = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    location: "",
    salary: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      setError("Title and description are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to post a job");
        setLoading(false);
        return;
      }

     await API.post(
  "/job/create",
  {
    title: form.title.trim(),
    description: form.description.trim(),
    skillsRequired: form.skillsRequired
      ? form.skillsRequired.split(",").map((s) => s.trim())
      : [],
    location: form.location,
    salary: form.salary,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      navigate("/recruiter/RecruiterDashboard/jobs");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Job creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-2">Create a Job</h2>
        <p className="text-sm text-gray-500 mb-6">
          Fill in the details to post a new job opening
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Job Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Senior MERN Developer"
              className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Job Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe the role, responsibilities, requirements..."
              className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Skills Required <span className="text-gray-400">(comma separated)</span>
            </label>
            <input
              type="text"
              name="skillsRequired"
              value={form.skillsRequired}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Remote / Bangalore"
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Salary</label>
              <input
                type="text"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="8 - 12 LPA"
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={loading
              ? "w-full bg-gray-400 cursor-not-allowed text-white py-3 rounded font-semibold transition"
              : "w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
            }
          >
            {loading ? "Posting Job..." : "Post Job"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateJob;