import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import { ToastContainer, toast } from "react-toastify";
import API from "../../../api/axios";

const Profile = () => {
  const navigate = useNavigate();

  // State
  const [profile, setProfile] = useState({
    firstName: "Piyush",
    lastName: "Kumar",
    email: "snohkmr04136@gmail.com",
    contact: "8340168796",
    city: "Patna",
    gender: "Male",
    languages: ["English", "Hindi"],
    type: "College student",
    profilePic: null,
    linkedin: "",
    github: "",
  });

  const [errors, setErrors] = useState({});

  const cities = ["Patna", "Bihar", "Delhi", "Mumbai"];
  const genders = ["Female", "Male", "Others"];
  const languages = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "French", "Japanese"];
  const types = ["College student", "Fresher", "Working professional", "School student", "Woman returning to work"];

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const toggleLanguage = (lang) => {
    setProfile((prev) => {
      if (prev.languages.includes(lang)) {
        return { ...prev, languages: prev.languages.filter((l) => l !== lang) };
      } else {
        return { ...prev, languages: [...prev.languages, lang] };
      }
    });
  };

  const selectType = (type) => {
    setProfile({ ...profile, type });
    setErrors({ ...errors, type: "" });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, profilePic: e.target.files[0] });
    setErrors({ ...errors, profilePic: "" });
  };

  // Validate mandatory fields
  const validate = () => {
    const newErrors = {};
    if (!profile.firstName.trim()) newErrors.firstName = "First name is required";
    if (!profile.contact.trim()) newErrors.contact = "Contact number is required";
    if (!profile.city.trim()) newErrors.city = "City is required";
    if (!profile.gender.trim()) newErrors.gender = "Gender is required";
    if (!profile.languages.length) newErrors.languages = "Select at least one language";
    if (!profile.type.trim()) newErrors.type = "Select your type";
   

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
  if (!validate()) {
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
      firstName: profile.firstName,
      lastName: profile.lastName,
      contact: profile.contact,
      city: profile.city,
      gender: profile.gender,
      languages: profile.languages,
      type: profile.type,
      linkedin: profile.linkedin,
      github: profile.github,
    };

    await API.post("/auth/profile", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Profile saved successfully 🎉");

    setTimeout(() => {
      navigate("/preferences");
    }, 1200);

  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Profile update failed ❌"
    );
  }
};



  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Stepper currentStep={0} />

      <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow space-y-6">

        <h1 className="text-2xl font-bold text-center">Create your profile</h1>

        {/* Name */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium">First name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              placeholder="First name"
              className={`border p-2 rounded ${errors.firstName ? "border-red-500" : ""}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
          </div>

          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium">Last name (Optional)</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={`border border-dashed p-3 rounded cursor-pointer ${errors.profilePic ? "border-red-500" : ""}`}
          />
          {errors.profilePic && <p className="text-red-500 text-xs">{errors.profilePic}</p>}
          <p className="text-xs text-gray-500 mt-1">
            Upload a professional picture of yourself (Max file size: 1Mb and max resolution: 500px x 500px)
          </p>
        </div>

        {/* Email */}
        <div className="flex justify-between items-center">
          <input
            type="email"
            value={profile.email}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
          <button className="text-blue-600 ml-3 text-sm">Change email</button>
        </div>

        {/* Contact */}
        <div className="flex gap-2 flex-col">
          <label className="text-sm font-medium">Contact number <span className="text-red-500">*</span></label>
          <div className="flex gap-2">
            <input
              type="text"
              value="+91"
              readOnly
              className="w-1/4 border p-2 rounded bg-gray-100"
            />
            <input
              type="text"
              value={profile.contact}
              onChange={handleChange}
              name="contact"
              className={`w-3/4 border p-2 rounded ${errors.contact ? "border-red-500" : ""}`}
              placeholder="Contact number"
            />
          </div>
          {errors.contact && <p className="text-red-500 text-xs">{errors.contact}</p>}
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Current city <span className="text-red-500">*</span></label>
          <select
            value={profile.city}
            onChange={handleChange}
            name="city"
            className={`w-full border p-2 rounded ${errors.city ? "border-red-500" : ""}`}
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Gender <span className="text-red-500">*</span></label>
          <div className="flex gap-2">
            {genders.map((g) => (
              <button
                key={g}
                onClick={() => setProfile({ ...profile, gender: g })}
                className={`px-4 py-2 rounded-full border ${
                  profile.gender === g ? "bg-blue-600 text-white" : "bg-white text-gray-600"
                } ${errors.gender ? "border-red-500" : ""}`}
              >
                {g}
              </button>
            ))}
          </div>
          {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
        </div>

        {/* Languages */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Languages you know <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={`px-3 py-1 rounded-full border ${
                  profile.languages.includes(lang)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {lang} {profile.languages.includes(lang) ? "×" : "+"}
              </button>
            ))}
          </div>
          {errors.languages && <p className="text-red-500 text-xs">{errors.languages}</p>}
        </div>

        {/* Type */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Type <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => selectType(t)}
                className={`px-4 py-2 rounded-full border ${
                  profile.type === t ? "bg-blue-600 text-white" : "bg-white text-gray-600"
                } ${errors.type ? "border-red-500" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
        </div>

        {/* LinkedIn & GitHub */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">LinkedIn profile (Optional)</label>
            <input
              type="text"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">GitHub profile (Optional)</label>
            <input
              type="text"
              name="github"
              value={profile.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={handleSubmit}
       className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          Create Profile
        </button>

      </div>
         <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Profile;
