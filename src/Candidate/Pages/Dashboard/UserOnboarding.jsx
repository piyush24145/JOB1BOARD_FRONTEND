import { useEffect, useState } from "react";
import API from "../../../api/axios";

const UserOnboarding = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (section, data) => {
    setEditSection(section);
    setFormData(data || {});
  };

  const cancelEdit = () => {
    setEditSection(null);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveSection = async (endpoint) => {
    try {
      await API.put(`/auth/${endpoint}`, formData);
      await fetchProfile();
      cancelEdit();
    } catch (err) {
      console.error("Save error", err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!user) return <p>No data</p>;

  const { profile, preferences, culture, resume } = user;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* PROFILE */}
      <Section
        title="👤 Profile"
        isEdit={editSection === "profile"}
        onEdit={() => startEdit("profile", profile)}
        onCancel={cancelEdit}
        onSave={() => saveSection("profile")}
      >
        {editSection === "profile" ? (
          <>
            <Input name="firstName" value={formData.firstName || ""} onChange={handleChange} label="First Name" />
            <Input name="lastName" value={formData.lastName || ""} onChange={handleChange} label="Last Name" />
            <Input name="contact" value={formData.contact || ""} onChange={handleChange} label="Contact" />
            <Input name="city" value={formData.city || ""} onChange={handleChange} label="City" />
          </>
        ) : (
          <>
            <p><b>Name:</b> {profile?.firstName} {profile?.lastName}</p>
            <p><b>Contact:</b> {profile?.contact}</p>
            <p><b>City:</b> {profile?.city}</p>
          </>
        )}
      </Section>

      {/* PREFERENCES */}
      <Section
        title="⚙️ Preferences"
        isEdit={editSection === "preferences"}
        onEdit={() => startEdit("preferences", preferences)}
        onCancel={cancelEdit}
        onSave={() => saveSection("preferences")}
      >
        {editSection === "preferences" ? (
          <>
            <Input name="jobType" value={formData.jobType || ""} onChange={handleChange} label="Job Type" />
            <Input name="location" value={formData.location || ""} onChange={handleChange} label="Location" />
            <Input name="desiredSalary" value={formData.desiredSalary || ""} onChange={handleChange} label="Salary" />
          </>
        ) : (
          <>
            <p><b>Job Type:</b> {preferences?.jobType}</p>
            <p><b>Location:</b> {preferences?.location}</p>
            <p><b>Salary:</b> {preferences?.desiredSalary}</p>
          </>
        )}
      </Section>

      {/* CULTURE */}
      <Section
        title="🌱 Culture"
        isEdit={editSection === "culture"}
        onEdit={() => startEdit("culture", culture)}
        onCancel={cancelEdit}
        onSave={() => saveSection("culture")}
      >
        {editSection === "culture" ? (
          <>
            <Input name="motivation" value={formData.motivation || ""} onChange={handleChange} label="Motivation" />
            <Input name="environment" value={formData.environment || ""} onChange={handleChange} label="Environment" />
          </>
        ) : (
          <>
            <p><b>Motivation:</b> {culture?.motivation}</p>
            <p><b>Environment:</b> {culture?.environment}</p>
          </>
        )}
      </Section>

      {/* RESUME */}
      <Section title="📄 Resume">
        {resume?.fileUrl ? (
          <a href={resume.fileUrl} target="_blank" className="text-blue-600 underline">
            View Resume
          </a>
        ) : (
          <p>No resume uploaded</p>
        )}
      </Section>
    </div>
  );
};

export default UserOnboarding;

/* ---------- REUSABLE COMPONENTS ---------- */

const Section = ({ title, children, isEdit, onEdit, onSave, onCancel }) => (
  <div className="bg-white p-6 rounded shadow space-y-3">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">{title}</h2>
      {onEdit && !isEdit && (
        <button onClick={onEdit} className="text-blue-600 text-sm">Edit</button>
      )}
    </div>

    {children}

    {isEdit && (
      <div className="flex gap-3">
        <button onClick={onSave} className="bg-blue-600 text-white px-4 py-1 rounded">
          Save
        </button>
        <button onClick={onCancel} className="border px-4 py-1 rounded">
          Cancel
        </button>
      </div>
    )}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      {...props}
      className="w-full border p-2 rounded mt-1"
    />
  </div>
);
