// Recruiter/Pager/RecruiterDashboard/RecruiterDashboard.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReSidebar from "./ReSidebar";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">

      {/* SIDEBAR (mobile me sidebar ReSidebar ke andar handle kar lena) */}
      <ReSidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col w-full">

        {/* TOP NAVBAR */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="
            h-auto md:h-16
            bg-white/70 backdrop-blur-xl shadow-sm
            flex flex-col md:flex-row
            md:items-center md:justify-between
            gap-3 md:gap-0
            px-4 md:px-6 py-3 md:py-0
            sticky top-0 z-40
          "
        >
          {/* LEFT TITLE */}
          <div className="text-center md:text-left">
            <h1 className="text-base md:text-lg font-semibold text-gray-800">
              Recruiter Dashboard
            </h1>
            <p className="text-xs text-gray-500">
              Manage jobs & applications
            </p>
          </div>

          {/* HOME BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="
              self-center md:self-auto
              px-4 py-1.5 text-sm
              rounded-full bg-gray-200 text-gray-800
              hover:bg-gray-300 transition
            "
          >
            🏠 Home
          </button>

          {/* RIGHT NAV */}
          <div className="flex items-center justify-center md:justify-end gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/recruiter/RecruiterDashboard/create-job")}
              className="
                px-4 py-1.5 text-sm
                rounded-full bg-blue-600 text-white
                hover:bg-blue-700 transition
              "
            >
              + Post Job
            </motion.button>

            {/* AVATAR */}
            <div className="
              w-9 h-9 rounded-full
              bg-gradient-to-br from-blue-500 to-indigo-500
              text-white flex items-center justify-center
              font-semibold
            ">
              R
            </div>
          </div>
        </motion.div>

        {/* MAIN CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex-1 p-3 sm:p-4 md:p-6"
        >
          {/* GLASS CARD WRAPPER */}
          <div className="
            bg-white/80 backdrop-blur-xl
            rounded-xl md:rounded-2xl
            shadow-lg
            p-4 sm:p-5 md:p-6
            min-h-[75vh] md:min-h-[80vh]
          ">
            <Outlet />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default RecruiterDashboard;
