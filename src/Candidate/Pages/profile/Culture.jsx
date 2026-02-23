import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stepper from "./Stepper";
import API from "../../../api/axios";

export default function CultureFitForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    interestedTech: [],
    avoidTech: [],
    motivation: "",
    careerTrack: "",
    environment: "",
    priorities: [],
    remote: "",
    quiet: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const techOptions = [
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "MySQL", label: "MySQL" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Next.js", label: "Next.js" },
    { value: "Tailwind CSS", label: "Tailwind CSS" },
  ];

  const priorityOptions = [
    "Autonomy",
    "Growth opportunities",
    "Learning from team",
    "Company growth",
    "Mentorship",
    "Skill development",
    "Challenging problems",
    "Supportive team",
  ];

  /* ================= Handlers ================= */

  const handleTechChange = (key, selected) => {
    if (selected.length > 5) {
      toast.error("You can select only up to 5 technologies");
      return;
    }
    setForm((prev) => ({ ...prev, [key]: selected }));
  };

  const toggleMulti = (key, value, max = 2) => {
    setForm((prev) => {
      if (prev[key].includes(value)) {
        return { ...prev, [key]: prev[key].filter((v) => v !== value) };
      }
      if (prev[key].length >= max) {
        toast.error(`You can select only ${max}`);
        return prev;
      }
      return { ...prev, [key]: [...prev[key], value] };
    });
  };

  /* ================= Validation ================= */

  const validateForm = () => {
    const e = {};

    if (form.interestedTech.length === 0) e.interestedTech = true;
    if (!form.motivation) e.motivation = true;
    if (!form.careerTrack) e.careerTrack = true;
    if (!form.environment) e.environment = true;
    if (form.priorities.length === 0) e.priorities = true;
    if (!form.remote) e.remote = true;
    if (!form.quiet) e.quiet = true;

    setErrors(e);

    if (Object.keys(e).length > 0) {
      toast.error("Please fill all required fields");
      return false;
    }
    return true;
  };

  /* ================= Submit ================= */

  const handleSubmit = async () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Please login again");

      const payload = {
        interestedTech: form.interestedTech.map((t) => t.value),
        avoidTech: form.avoidTech.map((t) => t.value),
        motivation: form.motivation,
        careerTrack: form.careerTrack,
        environment: form.environment,
        priorities: form.priorities,
        remote: form.remote,
        quiet: form.quiet,
        description: form.description,
      };

      await API.post("/auth/culture", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Culture saved successfully 🎉");
      setTimeout(() => navigate("/resume"), 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Culture update failed ❌");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <Stepper currentStep={2} />

      <div className="mx-auto max-w-4xl bg-white p-4 sm:p-6 rounded-xl shadow mt-6 space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold">Find your culture fit</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Tell us about your interests and preferences and we’ll find the best jobs.
        </p>

        <Section title="Technologies you want to work with" required>
          <Select
            isMulti
            options={techOptions}
            value={form.interestedTech}
            onChange={(s) => handleTechChange("interestedTech", s)}
            placeholder="Select up to 5"
          />
        </Section>

        <Section title="Technologies you want to avoid">
          <Select
            isMulti
            options={techOptions}
            value={form.avoidTech}
            onChange={(s) => handleTechChange("avoidTech", s)}
            placeholder="Optional"
          />
        </Section>

        <RadioGroup
          title="What motivates you more?"
          required
          value={form.motivation}
          onChange={(v) => setForm({ ...form, motivation: v })}
          options={["Solving technical problems", "Building products"]}
        />

        <RadioGroup
          title="Career track (next 5 years)"
          required
          value={form.careerTrack}
          onChange={(v) => setForm({ ...form, careerTrack: v })}
          options={["Individual contributor", "Manager"]}
        />

        <RadioGroup
          title="Work environment"
          required
          value={form.environment}
          onChange={(v) => setForm({ ...form, environment: v })}
          options={[
            "Clear responsibilities and feedback",
            "Fast-paced figure-it-out culture",
          ]}
        />

        <Section title="Top priorities (Max 2)" required>
          <Options
            options={priorityOptions}
            selected={form.priorities}
            onClick={(v) => toggleMulti("priorities", v, 2)}
          />
        </Section>

        <RadioGroup
          title="Remote work importance"
          required
          value={form.remote}
          onChange={(v) => setForm({ ...form, remote: v })}
          options={["Very important", "Important", "Not important"]}
        />

        <RadioGroup
          title="Quiet office importance"
          required
          value={form.quiet}
          onChange={(v) => setForm({ ...form, quiet: v })}
          options={["Very important", "Important", "Not important"]}
        />

        <div>
          <label className="font-medium text-sm block mb-1">
            Describe your next job
          </label>
          <textarea
            rows={4}
            maxLength={300}
            className="w-full border rounded-lg p-3 text-sm"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <p className="text-xs text-gray-500">
            {form.description.length}/300
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
}

/* ================= Reusable Components ================= */

function Section({ title, required, children }) {
  return (
    <div>
      <h2 className="font-medium text-sm mb-2">
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </h2>
      {children}
    </div>
  );
}

function Options({ options, selected, onClick }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onClick(opt)}
          className={`px-3 py-1 rounded-full text-xs sm:text-sm border ${
            selected.includes(opt)
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function RadioGroup({ title, options, value, onChange, required }) {
  return (
    <div>
      <h2 className="font-medium text-sm mb-2">
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
            <span className="text-sm">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
