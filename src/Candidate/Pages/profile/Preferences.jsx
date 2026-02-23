import { useState } from "react";
import Stepper from "./Stepper";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api/axios";


const Preferences = () => {
  const navigate = useNavigate();

  const [jobSearch, setJobSearch] = useState("Ready to Interview");
  const [jobType, setJobType] = useState("Full-time Employee");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [roles, setRoles] = useState([]);
  const [location, setLocation] = useState(null);
  const [remote, setRemote] = useState(false);
  const [usAuth, setUsAuth] = useState({ authorized: "", visa: "" });
  const [companySize, setCompanySize] = useState({
    seed: "",
    early: "",
    mid: "",
    large: "",
    veryLarge: "",
    massive: "",
  });
  const [errors, setErrors] = useState({});

  const Star = () => <span className="text-red-500 ml-1">*</span>;

  const validateForm = () => {
    const e = {};
    if (!jobSearch) e.jobSearch = true;
    if (!jobType) e.jobType = true;
    if (!desiredSalary) e.desiredSalary = true;
    if (roles.length === 0) e.roles = true;
    if (!location) e.location = true;
    if (!usAuth.authorized) e.authorized = true;
    if (!usAuth.visa) e.visa = true;

    setErrors(e);

    if (Object.keys(e).length > 0) {
      toast.error("Please fill all required fields");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors above ❌");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        toast.error("Please login again");
        return;
      }
  
     const payload = {
      jobType,
      location: location.value,
      currency,
      jobSearch,
      desiredSalary,
      roles: roles.map((r) => r.value),
      usAuth,
      remote,
      companySize,
    };
      await API.post("/auth/preferences", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      toast.success("Prefernce saved successfully 🎉");
  
      setTimeout(() => {
        navigate("/culture");
      }, 1200);
  
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Prefernces update failed ❌"
      );
    }
  };

  const roleOptions = [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "Web Developer", label: "Web Developer" },
    { value: "Content Creator", label: "Content Creator" },
    { value: "Data Scientist", label: "Data Scientist" },
    { value: "AI/ML Engineer", label: "AI/ML Engineer" },
    { value: "UX/UI Designer", label: "UX/UI Designer" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
  ];

  const countryOptions = [
    { value: "India", label: "India" },
    { value: "United States", label: "United States" },
    { value: "Germany", label: "Germany" },
    { value: "Canada", label: "Canada" },
    { value: "United Kingdom", label: "United Kingdom" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Stepper currentStep={1} />

      <div className="max-w-3xl mx-auto mt-6 bg-white p-5 sm:p-8 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-bold">Preferences</h1>

        {/* Job Search */}
        <div>
          <label className="font-semibold">
            Where are you in your Job search?<Star />
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Ready to Interview", "Open to offers", "Closed to offers"].map((s) => (
              <button
                key={s}
                onClick={() => setJobSearch(s)}
                className={`px-4 py-2 rounded-lg border ${
                  jobSearch === s
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="font-semibold">
            What type of Job are you Interested In?<Star />
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Full-time Employee", "Contractor", "Intern", "Co-founder"].map((t) => (
              <button
                key={t}
                onClick={() => setJobType(t)}
                className={`px-4 py-2 rounded-lg border ${
                  jobType === t
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Salary */}
        <div>
          <label className="font-semibold">
            What is your desired salary?<Star />
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="number"
              value={desiredSalary}
              onChange={(e) => setDesiredSalary(e.target.value)}
              className="border rounded-lg px-3 py-2 flex-1"
              placeholder="Amount"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="USD">$ USD</option>
              <option value="INR">₹ INR</option>
              <option value="EUR">€ EUR</option>
            </select>
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="font-semibold">
            What kind of role are you looking for?<Star />
          </label>
          <Select
            isMulti
            options={roleOptions}
            value={roles}
            onChange={setRoles}
            placeholder="Select roles"
          />
          {errors.roles && (
            <p className="text-red-500 text-sm mt-1">Required</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">
            Where do you want to work?<Star />
          </label>
          <Select
            options={countryOptions}
            value={location}
            onChange={setLocation}
            placeholder="Select country"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">Required</p>
          )}
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={remote}
              onChange={() => setRemote(!remote)}
            />
            I'm open to working remotely
          </label>
        </div>

        {/* US Auth */}
        <div>
          <label className="font-semibold">
            US work authorization<Star />
          </label>

          <div className="mt-2">
            <p>Authorized to work in US?</p>
            <div className="flex gap-4">
              {["Yes", "No"].map((v) => (
                <label key={v} className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={usAuth.authorized === v}
                    onChange={() =>
                      setUsAuth({ ...usAuth, authorized: v })
                    }
                  />
                  {v}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-2">
            <p>Need visa sponsorship?</p>
            <div className="flex gap-4">
              {["Yes", "No"].map((v) => (
                <label key={v} className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={usAuth.visa === v}
                    onChange={() =>
                      setUsAuth({ ...usAuth, visa: v })
                    }
                  />
                  {v}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Company Size */}
        <div>
          <label className="font-semibold">
            Would you like to work at companies of these sizes?
          </label>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {Object.keys(companySize).map((k) => (
              <div key={k}>
                <p className="capitalize">{k}</p>
                {["Ideal", "Yes", "No"].map((o) => (
                  <label key={o} className="flex gap-1">
                    <input
                      type="radio"
                      checked={companySize[k] === o}
                      onChange={() =>
                        setCompanySize({ ...companySize, [k]: o })
                      }
                    />
                    {o}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          Save Preferences
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Preferences;
