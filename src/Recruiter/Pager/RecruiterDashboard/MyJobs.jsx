import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../api/axios";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyJobs = async () => {
    try {
      const res = await API.get("/job/my-jobs");
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading jobs...</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">My Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs created yet</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-4 rounded shadow"
            >
              <p className="font-semibold text-lg">
                {job.title}
              </p>

              <p className="text-xs text-blue-600 font-bold">
                Skills Required: {job.skillsRequired.join(", ")}
              </p>

              <p className="text-xs text-red-600">
                Posted on{" "}
                {new Date(job.createdAt).toLocaleDateString()}
              </p>

              {/* 🔥 VIEW APPLICANTS BUTTON */}
<Link
  to={`/recruiter/RecruiterDashboard/applicants/${job._id}`}
  className="inline-block mt-3 text-sm text-white bg-blue-600 px-3 py-1 rounded"
>
  View Applicants
</Link>



            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyJobs;
