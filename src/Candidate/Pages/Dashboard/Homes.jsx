import { useEffect, useState } from "react";
import API from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate= useNavigate();
  // 🔹 fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const [jobsRes, appliedRes] = await Promise.all([
        API.get("/job/totaljobs"),
        API.get("/application/my"),
      ]);

      setRecommendedJobs(jobsRes.data.jobs || []);
      setAppliedJobs(appliedRes.data.applications || []);
    } catch (err) {
      console.error("Dashboard fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="space-y-10">

      {/* ================= Recommended Jobs ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Recommended Jobs</h2>
            <p className="text-sm text-gray-500">
              Jobs where you're a top applicant based on your profile
            </p>
          </div>
          <button className="text-blue-600 text-sm">
            Change job preferences
          </button>
        </div>

        {recommendedJobs.slice(0, 1).map((job) => (
          <div key={job._id} className="flex justify-between items-center border-t pt-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                🏢
              </div>
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company?.name}</p>
                <p className="text-sm text-gray-500">
                  {job.company?.location || "Remote"}
                </p>
                <p className="text-xs text-gray-400">
                  Posted {Math.ceil(
                    (Date.now() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24)
                  )} days ago
                </p>
              </div>
            </div>

            <button className="border px-4 py-1 rounded text-sm">
              Save
            </button>
          </div>
        ))}

        <div className="text-center mt-4">
  <button
    onClick={() => navigate("/dashboard/jobs")}
    className="text-blue-600 text-sm hover:underline"
  >
    See more jobs
  </button>
</div>

      </div>

      {/* ================= Recently Applied Jobs ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recently Applied Jobs</h2>

        {appliedJobs.length === 0 && (
          <p className="text-gray-500 text-sm">No applied jobs yet</p>
        )}

        {appliedJobs.map((app) => (
          <div
            key={app._id}
            className="flex justify-between items-center border-t py-4"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                🏢
              </div>
              <div>
                <h3 className="font-semibold">{app.job?.title}</h3>
                <p className="text-sm text-gray-600">
                  {app.job?.company?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {app.job?.company?.location || "Remote"}
                </p>
                <p className="text-xs text-gray-400">
                  Applied on {new Date(app.createdAt).toDateString()}
                </p>
              </div>
            </div>

            <span className="text-gray-400">›</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
