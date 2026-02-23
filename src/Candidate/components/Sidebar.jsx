import { NavLink } from "react-router-dom";
import {
  Home,
  Briefcase,
  User,
  ClipboardCheck,
  MessageCircle,
  Compass,
  Zap,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
     ${
       isActive
         ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
         : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
     }`;

  const links = [
    { to: "/dashboard", icon: <Home size={18} />, label: "Home" },
    { to: "/dashboard/jobs", icon: <Briefcase size={18} />, label: "Jobs" },
    { to: "/dashboard/onprofile", icon: <User size={18} />, label: "Profile" },
    { to: "/dashboard/applied", icon: <ClipboardCheck size={18} />, label: "Applied" },
    { to: "/dashboard/messages", icon: <MessageCircle size={18} />, label: "Messages" },
    { to: "/dashboard/discover", icon: <Compass size={18} />, label: "Discover" },
    { to: "/dashboard/demand", icon: <Zap size={18} />, label: "On-Demand" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* MOBILE OVERLAY */}
          <motion.div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* SIDEBAR */}
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 90, damping: 15 }}
            className="
              fixed md:static z-50
              w-64
              top-16 md:top-0
              left-4 md:left-0
              p-3
            "
          >
            <div className="
              h-full
              bg-white/80 backdrop-blur-xl
              rounded-3xl
              shadow-xl
              p-5
              flex flex-col
              border border-white/60
            ">
              {/* MOBILE CLOSE */}
              <div className="md:hidden flex justify-end mb-4">
                <X
                  className="cursor-pointer text-gray-500 hover:text-red-500"
                  onClick={closeSidebar}
                />
              </div>

              {/* NAV */}
              <nav className="space-y-2">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/dashboard"}
                    className={linkClass}
                    onClick={closeSidebar}
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* FOOTER */}
              <div className="mt-auto pt-6 text-xs text-gray-400 text-center">
                © 2026 JobBoard
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
