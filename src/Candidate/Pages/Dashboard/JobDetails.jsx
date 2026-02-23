import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api/axios";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data.job);
    } catch (error) {
      console.error("Job details error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading job details...</p>;
  if (!job) return <p className="p-6">Job not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-5">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4"
      >
        ← Back to jobs
      </button>

      {/* CARD */}
      <div className="bg-white shadow rounded-xl p-6">

        {/* TITLE */}
        <h1 className="text-2xl font-bold">{job.title}</h1>

        {/* COMPANY */}
        <p className="text-gray-600 text-lg mt-1">
          {job.company}
        </p>

        {/* META INFO */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-500 mt-3">
          <span>📍 {job.location || "Remote"}</span>
          {job.salary && <span>💰 {job.salary}</span>}
          <span>
            🕒 Posted on{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* SKILLS */}
        {job.skillsRequired?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* APPLY */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
