import { useEffect, useState } from "react";
import API from "../../../api/axios";

const CompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    companyDescription: "",
    companyWebsite: "",
    companyLocation: "",
  });

  // Fetch recruiter profile
  const fetchProfile = async () => {
    try {
      const res = await API.get("/recruiter/profile"); // backend route
      setProfile(res.data.recruiter);

      setFormData({
        company: res.data.recruiter.company || "",
        companyDescription: res.data.recruiter.companyDescription || "",
        companyWebsite: res.data.recruiter.companyWebsite || "",
        companyLocation: res.data.recruiter.companyLocation || "",
      });
    } catch (err) {
      console.error("Error fetching profile:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated profile
  const handleSave = async () => {
    try {
      const res = await API.put("/recruiter/profile/update", formData);
      setProfile(res.data.recruiter);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (!profile) return <p className="text-red-500">Profile not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Company Profile</h1>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {editMode ? (
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Company Name:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Description:</label>
            <textarea
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Website:</label>
            <input
              type="text"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Location:</label>
            <input
              type="text"
              name="companyLocation"
              value={formData.companyLocation}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Company Name:</p>
            <p>{profile.company}</p>
          </div>
          <div>
            <p className="font-semibold">Description:</p>
            <p>{profile.companyDescription || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Website:</p>
            {profile.companyWebsite ? (
              <a
                href={profile.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {profile.companyWebsite}
              </a>
            ) : (
              <span>N/A</span>
            )}
          </div>
          <div>
            <p className="font-semibold">Location:</p>
            <p>{profile.companyLocation || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
