import { useEffect, useState } from "react";
import API from "../../../api/axios";

const ReDashboardHome = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    newToday: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const res = await API.get("/recruiter/dashboard-stats");
      setStats({
        totalJobs: res.data.totalJobs,
        totalApplicants: res.data.totalApplicants,
        newToday: res.data.newToday,
      });
    } catch (err) {
      console.error("Dashboard stats error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-gray-500">Total Jobs</h3>
          <p className="text-3xl font-bold">{stats.totalJobs}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-gray-500">Total Applicants</h3>
          <p className="text-3xl font-bold">{stats.totalApplicants}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-gray-500">New Today</h3>
          <p className="text-3xl font-bold">{stats.newToday}</p>
        </div>
      </div>
    </>
  );
};

export default ReDashboardHome;
