import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../api/axios";

const Applicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Update status of an application (Accept/Reject/Shortlist)
  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("recruiterToken");

      // PUT request to update status
      const res = await API.put(
        `/application/${applicationId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 🔹 Update local state with new application object from backend
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? res.data.application : app
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  // 🔹 Fetch all applicants for the job
  useEffect(() => {
    if (!jobId) return;

    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("recruiterToken");

       const res = await API.get(`/application/job/${jobId}`, {
  headers: { Authorization: `Bearer ${token}` },
});
        setApplications(res.data.applications || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  // 🔹 Loading & Error states
  if (loading) return <p className="p-6 text-center">Loading applicants...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (applications.length === 0)
    return <p className="p-6 text-center text-gray-500">No applicants yet 😕</p>;

  return (
    <div className="space-y-4 max-w-3xl mx-auto p-4">
      {applications.map((app) => (
        <div
          key={app._id}
          className="p-4 border rounded shadow-sm flex flex-col gap-2"
        >
          {/* Candidate Info */}
          <p className="font-semibold text-lg">{app.candidate?.name}</p>
          <p className="text-sm text-gray-600">{app.candidate?.email}</p>

          {/* Status Badge */}
          <span
            className={`text-xs font-semibold px-2 py-1 rounded w-fit ${
              app.status === "shortlisted"
                ? "bg-green-100 text-green-700"
                : app.status === "rejected"
                ? "bg-red-100 text-red-700"
                : app.status === "applied"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {app.status || "pending"}
          </span>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => updateStatus(app._id, "shortlisted")}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
            >
              Accept
            </button>

            <button
              onClick={() => updateStatus(app._id, "rejected")}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Applicants;
