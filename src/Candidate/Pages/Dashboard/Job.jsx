import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../../api/axios";
import { Search } from "lucide-react";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [resume, setResume] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [applying, setApplying] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  // 🔹 Fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await API.get("/job/totaljobs");
      // backend should populate company name + location
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error("Fetch jobs error", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch applied jobs
  const fetchAppliedJobs = async () => {
    try {
      const res = await API.get("/application/my");
      const ids = res.data.applications.map(app => app.job?._id);
      setAppliedJobIds(ids);
    } catch (err) {
      console.error("Fetch applied jobs error", err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, []);

  // 🔍 Search filter
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.location?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ APPLY JOB
  const applyJob = async () => {
    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    if (!confirm) {
      alert("Please confirm resume correctness");
      return;
    }

    try {
      setApplying(true);

      const formData = new FormData();
      formData.append("resume", resume);

      await API.post(
        `/application/apply/${selectedJob._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("✅ Successfully applied!");

      setAppliedJobIds(prev => [...prev, selectedJob._id]);
      setSelectedJob(null);
      setResume(null);
      setConfirm(false);
    } catch (err) {
      alert(err.response?.data?.message || "Apply failed");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <p className="p-6">Loading jobs...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">



{/* SEARCH */}
<div className="relative mb-6 group">
  {/* Soft Border */}
  <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-30 group-focus-within:opacity-60 transition"></div>

  {/* Input Box */}
  <div className="relative flex items-center bg-white rounded-xl shadow-sm group-focus-within:shadow-md transition">
    
    {/* Icon */}
    <Search
      size={18}
      className="ml-4 text-gray-400 group-focus-within:text-indigo-500 transition"
    />

    {/* Input */}
    <input
      type="text"
      placeholder="Search jobs, companies, locations..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-4 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base rounded-xl"
    />
  </div>
</div>



      {/* JOB LIST */}
      <div className="grid md:grid-cols-2 gap-5">
        {filteredJobs.map(job => (
          <motion.div
            key={job._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold">{job.title}</h2>
         <p className="text-gray-600">{job.company}</p>
<p className="text-gray-500 text-sm">{job.location || "Remote"}</p>

            <div className="flex gap-4 text-sm text-gray-500 mt-2">
              <span>💰 {job.salary || "Not disclosed"}</span>
            </div>

            <p className="mt-3 text-sm line-clamp-2">{job.description}</p>

            {/* APPLY CTA */}
            <div className="mt-4 flex justify-center">
              {appliedJobIds.includes(job._id) ? (
                <span className="text-green-600 text-sm font-medium">✅ Applied</span>
              ) : (
                <button
                  onClick={() => setSelectedJob(job)}
                  className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
                >
                  Apply Job
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* APPLY MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white max-w-2xl w-full p-6 rounded-xl relative"
            >
              <button
                className="absolute right-4 top-4 text-xl"
                onClick={() => setSelectedJob(null)}
              >
                ❌
              </button>

              <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
              <p className="text-gray-600">{selectedJob.company?.name || "Unknown Company"}</p>
              <p className="text-gray-500 text-sm">{selectedJob.company?.location || "Remote"}</p>
              <p className="mt-4">{selectedJob.description}</p>

              {/* RESUME */}
              <div className="mt-5">
                <label className="font-medium">Upload Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="block mt-2"
                  onChange={(e) => setResume(e.target.files[0])}
                />
                {resume && (
                  <p className="text-green-600 text-sm mt-1">
                    Selected: {resume.name}
                  </p>
                )}
              </div>

              {/* CONFIRM */}
              <div className="mt-4 flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={confirm}
                  onChange={(e) => setConfirm(e.target.checked)}
                />
                <p className="text-sm">
                  I confirm that the resume uploaded is correct.
                </p>
              </div>

              {/* APPLY BUTTON CENTER */}
              {appliedJobIds.includes(selectedJob._id) ? (
                <button
                  disabled
                  className="w-full mt-6 bg-gray-400 text-white py-2 rounded"
                >
                  Already Applied
                </button>
              ) : (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={applyJob}
                    disabled={applying}
                    className="bg-blue-600 text-white py-2 px-8 rounded hover:bg-blue-700"
                  >
                    {applying ? "Applying..." : "Apply Job"}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Jobs;
