import { Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const jobs = [
    { _id: "1", title: "Frontend Developer", company: "Google" },
    { _id: "2", title: "Backend Developer", company: "Amazon" },
    { _id: "3", title: "React Developer", company: "Microsoft" },
    { _id: "4", title: "UI Designer", company: "Netflix" },
    { _id: "5", title: "Full Stack Developer", company: "Flipkart" },
  ];

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="px-4 pt-4">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          h-16
          bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50
          border border-white/60
          backdrop-blur-xl
          rounded-2xl
          shadow-lg
          flex items-center justify-between
          px-5 md:px-7
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <motion.div
            whileTap={{ scale: 0.85 }}
            className="md:hidden"
          >
            <Menu
              className="cursor-pointer text-indigo-600"
              onClick={toggleSidebar}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              font-extrabold text-lg
              bg-gradient-to-r from-indigo-600 to-purple-600
              bg-clip-text text-transparent
            "
          >
            JobBoard
          </motion.h2>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5 relative">
          {/* 🔍 SEARCH */}
          <div className="hidden md:block relative">
            <motion.div
              whileFocus={{ scale: 1.03 }}
              className="
                flex items-center gap-2
                bg-white/70
                border border-white
                rounded-full
                px-4 py-1.5
                shadow-sm
              "
            >
              <Search className="w-4 h-4 text-indigo-500" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowDropdown(true);
                }}
                className="
                  bg-transparent outline-none
                  text-sm w-52
                  placeholder:text-gray-400
                "
              />
            </motion.div>

            {/* 🔽 DROPDOWN */}
            <AnimatePresence>
              {showDropdown && query && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="
                    absolute top-12 left-0 w-full
                    bg-white/90
                    backdrop-blur-xl
                    border border-white
                    rounded-2xl
                    shadow-xl
                    z-50
                    overflow-hidden
                  "
                >
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <motion.div
                        key={job._id}
                        whileHover={{
                          backgroundColor: "#eef2ff",
                        }}
                        onClick={() => {
                          navigate(`/dashboard/jobs`);
                          setQuery("");
                          setShowDropdown(false);
                        }}
                        className="px-4 py-3 cursor-pointer"
                      >
                        <p className="text-sm font-semibold text-gray-800">
                          {job.title}
                        </p>
                        <p className="text-xs text-indigo-500">
                          {job.company}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-sm text-gray-500">
                      No jobs found 😕
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 🚪 LOGOUT */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="
              px-4 py-2
              bg-gradient-to-r from-rose-500 to-pink-500
              text-white
              rounded-full
              font-semibold
              text-sm
              shadow-lg
              hover:shadow-rose-300
              flex items-center gap-2
            "
          >
            🚪 Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Topbar;
