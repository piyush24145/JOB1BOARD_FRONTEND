import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../../api/axios";

const Applied = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/application/my");
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error("Fetch applied jobs error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading applied jobs...</p>;
  }

  if (applications.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        😕 You haven’t applied to any jobs yet
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">📌 Applied Jobs</h1>

      {applications.map((app, index) => (
        <motion.div
          key={app._id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white p-5 rounded-xl shadow border"
        >
          <div className="flex flex-col md:flex-row md:justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                {app.job?.title}
              </h2>

              <p className="text-gray-600 text-sm">
                🏢 {app.job?.company}
              </p>

              <div className="flex gap-4 text-sm text-gray-500 mt-1">
                <span>📍 {app.job?.location || "Remote"}</span>
                <span>💰 {app.job?.salary || "Not disclosed"}</span>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Applied on{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* STATUS */}
            <div className="flex items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  app.status === "applied"
                    ? "bg-blue-100 text-blue-700"
                    : app.status === "shortlisted"
                    ? "bg-yellow-100 text-yellow-700"
                    : app.status === "hired"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {app.status.toUpperCase()}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Applied;
