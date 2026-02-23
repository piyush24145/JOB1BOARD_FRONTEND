import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../api/axios";

const RecruiterRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    role: "",
    phone: "",
    email: "",
    password: "",
    companyType: "",
    companyDescription:"",
    companyWebsite:"",
    companyLocation:"",
    agree: false,

  });

 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm({
    ...form,
    [name]: type === "checkbox" ? checked : value,
  });
};
  
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.companyName || !form.email || !form.password) {
    alert("All fields are required");
    return;
  }

  if (!form.agree) {
    alert("Please accept Terms & Privacy Policy");
    return;
  }

  try {
    const res = await API.post("/recruiter/register", {
      company: form.companyName,
        email: form.email,
      password: form.password,
      companyType:form.companyType,
      role:form.role,
      phone:form.phone,
      companyDescription:form.companyDescription,
      companyWebsite:form.companyWebsite,
      companyLocation:form.companyLocation,
    });

    console.log("RECRUITER REGISTER:", res.data);

    navigate("/recruiter/login");
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg grid md:grid-cols-2 gap-8 p-8">

        {/* LEFT FORM */}
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Ready to hire with less effort?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            If you are looking for a job,{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              click here
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Company Name */}
            <div>
              <label className="text-sm font-medium">Company Name</label>
            <input
  type="text"
  name="companyName"         
  value={form.companyName}
  onChange={handleChange}
  placeholder="e.g. Amazon or CareerZen Consulting"
  className="w-full border rounded px-3 py-2 mt-1"
  required
/>
            </div>

            {/* Your Role */}
            <div>
              <label className="text-sm font-medium">Your Role</label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g. Talent Acquisition Specialist"
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>



<div>
   <label className="text-sm font-medium">company Description</label>
  <input
  type="text"
  name="companyDescription"         
  value={form.companyDescription}
  onChange={handleChange}
  placeholder="e.g. Business Type / Industry"
  className="w-full border rounded px-3 py-2 mt-1"
  required
/>  </div>

<div>
   <label className="text-sm font-medium">company Website</label>
  <input
  type="text"
  name="companyWebsite"         
  value={form.companyWebsite}
  onChange={handleChange}
  placeholder="e.g. https://www.technova.com"
  className="w-full border rounded px-3 py-2 mt-1"
  required
/>  </div>

<div>
   <label className="text-sm font-medium">company Location</label>
  <input
  type="text"
  name="companyLocation"         
  value={form.companyLocation}
  onChange={handleChange}
  placeholder="e.g. Bangalore, Karnataka"
  className="w-full border rounded px-3 py-2 mt-1"
  required
/>  </div>




            {/* Mobile Number */}
            <div>
              <label className="text-sm font-medium">Mobile Number</label>
              <div className="flex gap-2 mt-1">
                <span className="border px-3 py-2 rounded bg-gray-100">🇮🇳 +91</span>
               <input
  type="tel"         
  name="phone"
  value={form.phone}
  onChange={handleChange}
  placeholder="9876543210"
  className="flex-1 border rounded px-3 py-2"
  required
/>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your company email address"
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Set a password"
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            {/* Company Type */}
            <div>
              <label className="text-sm font-medium">Company Type</label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="companyType"
                    value="direct"
                    onChange={handleChange}
                    required
                  />
                  Direct hire (single company)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="companyType"
                    value="agency"
                    onChange={handleChange}
                  />
                  Agency (hire for multiple companies)
                </label>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1"
              />
              <span>
                I agree to the{" "}
                <span className="text-blue-600">Terms of Service</span> and{" "}
                <span className="text-blue-600">Privacy Policy</span>.
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
            >
              Create an account
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/recruiter/login" className="text-blue-600 font-medium">
              Log in here
            </Link>
          </p>
        </div>

        {/* RIGHT TESTIMONIAL */}
        <div className="hidden md:flex flex-col justify-center gap-6 bg-gray-50 p-6 rounded-lg">
          <div className="bg-white p-4 rounded shadow text-sm">
            “The quality of profiles is really great. Most relevant and niche
            profiles are available!”
            <p className="mt-2 font-semibold">
              Sandhya Sachan
              <span className="block text-xs text-gray-500">
                Tech Recruiter at Amazon
              </span>
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow text-sm">
            “Candidate quality is far superior and response rate is amazing.”
            <p className="mt-2 font-semibold">
              Ajith Inguva
              <span className="block text-xs text-gray-500">
                Senior Recruiter at Zomato
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecruiterRegister;
