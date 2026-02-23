// Recruiter/Pager/RecruiterDashboard/ReSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ReSidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 🔄 Handle resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setOpen(true); // desktop → open
      } else {
        setOpen(false); // mobile → closed by default
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/recruiter/login");
  };

  const handleNavClick = () => {
    if (isMobile) setOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
     ${
       isActive
         ? "bg-blue-600 text-white shadow-sm"
         : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
     }`;

  return (
    <>
      {/* ☰ MOBILE TOGGLE */}
      {isMobile && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md"
        >
          ☰
        </button>
      )}

      {/* 🌑 OVERLAY */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
          />
        )}
      </AnimatePresence>

      {/* 📌 SIDEBAR */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            className={`
              fixed md:static z-50
              w-64 min-h-screen
              bg-white
              border-r border-gray-200
              shadow-xl
              p-5
              ${isMobile ? "rounded-r-2xl" : ""}
            `}
          >
            {/* HEADER */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800">
                Recruiter Panel
              </h2>
              <p className="text-xs text-gray-500">
                Manage hiring smartly
              </p>
            </div>

            {/* NAV */}
            <nav className="space-y-2">
              <NavLink
                to="/recruiter/RecruiterDashboard"
                end
                className={linkClass}
                onClick={handleNavClick}
              >
                📊 Dashboard
              </NavLink>

              <NavLink
                to="/recruiter/RecruiterDashboard/create-job"
                className={linkClass}
                onClick={handleNavClick}
              >
                ➕ Create Job
              </NavLink>

              <NavLink
                to="/recruiter/RecruiterDashboard/jobs"
                className={linkClass}
                onClick={handleNavClick}
              >
                💼 My Jobs
              </NavLink>

              <NavLink
                to="/recruiter/RecruiterDashboard/Companyprofile"
                className={linkClass}
                onClick={handleNavClick}
              >
                🏢 Company Profile
              </NavLink>

              <NavLink
                to="RecruiterNotifications"
                className={linkClass}
                onClick={handleNavClick}
              >
                🏢 Notification
              </NavLink>
            </nav>

            {/* DIVIDER */}
            <div className="my-6 border-t border-gray-200" />

            {/* LOGOUT */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 font-semibold hover:bg-red-50 transition"
            >
              🚪 Logout
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReSidebar;
