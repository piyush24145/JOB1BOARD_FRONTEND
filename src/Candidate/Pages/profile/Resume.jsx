import { useRef, useState } from "react";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import API from "../../../api/axios";

const Resume = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only DOC, DOCX, PDF, TXT files allowed");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const res = await API.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResume(file);
      setResumeUrl(res.data.resume.fileUrl);

      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      alert("Resume upload failed");
    } finally {
      setLoading(false);
    }
  };

  const viewResume = () => {
    if (!resumeUrl) return;

    const baseURL = API.defaults.baseURL.replace("/api", "");
    window.open(`${baseURL}${resumeUrl}`, "_blank");
  };

  const removeResume = async () => {
    try {
      await API.delete("/resume/delete");
      setResume(null);
      setResumeUrl(null);
      fileRef.current.value = "";
    } catch {
      alert("Failed to delete resume");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Stepper currentStep={3} />

      <div className="max-w-5xl mx-auto bg-white border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div>
            <h2 className="text-lg font-semibold">
              Upload your recent resume or CV
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Upload your most up-to-date resume
            </p>
            <p className="text-sm text-gray-500 mt-2">
              File types: DOC, DOCX, PDF, TXT
            </p>
          </div>

          {/* RIGHT */}
          <div className="space-y-3">
            {resume && (
              <>
                <p className="font-medium text-gray-800">
                  {resume.name}
                </p>

                <button
                  onClick={viewResume}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View your resume
                </button>
              </>
            )}

            <div
              onClick={() => fileRef.current.click()}
              className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
            >
              <FileText size={36} className="text-blue-600 mb-2" />
              <p className="text-blue-600 font-medium">
                {loading ? "Uploading..." : "Upload new file"}
              </p>
            </div>

            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />

            {resume && (
              <button
                onClick={removeResume}
                className="text-sm text-gray-500 hover:text-red-600"
              >
                Remove your resume
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Resume;
