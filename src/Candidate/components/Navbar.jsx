import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const signupRef = useRef(null);

  // ✅ Outside click + ESC key close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (signupRef.current && !signupRef.current.contains(e.target)) {
        setSignupOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSignupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-100/70 backdrop-blur-md"
    >
      <div className="px-3 pt-3">
        <div className="max-w-7xl mx-auto h-16 bg-white rounded-2xl shadow-md px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="text-blue-600" size={26} />
            <span className="font-bold text-lg">
              Job<span className="text-blue-600">Portal</span>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/jobs" className="hover:text-blue-600">Find Jobs</Link>
            <Link to="/companies" className="hover:text-blue-600">Companies</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="hidden md:flex items-center gap-6 relative"
            ref={signupRef}
          >
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>

            {/* SIGNUP */}
            <button
              onClick={() => setSignupOpen((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Signup <ChevronDown size={16} />
            </button>

            {/* DROPDOWN */}
            <AnimatePresence>
              {signupOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-lg overflow-hidden border"
                >
                  <Link
                    to="/register?role=candidate"
                    onClick={() => setSignupOpen(false)}
                    className="block px-4 py-3 text-sm hover:bg-gray-100"
                  >
                    👤 As Candidate
                  </Link>
                  <Link
                    to="/recruiter/register?role=recruiter"
                    onClick={() => setSignupOpen(false)}
                    className="block px-4 py-3 text-sm hover:bg-gray-100"
                  >
                    🏢 As Recruiter
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE MENU ICON */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
