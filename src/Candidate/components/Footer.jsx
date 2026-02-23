import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white">
            Job<span className="text-blue-500">Portal</span>
          </h2>
          <p className="text-sm mt-4 text-gray-400 leading-relaxed">
            Find jobs that match your passion.  
            Connecting talent with top companies worldwide.
          </p>

          <div className="flex gap-4 mt-6">
            <SocialIcon Icon={FaFacebookF} />
            <SocialIcon Icon={FaTwitter} />
            <SocialIcon Icon={FaLinkedinIn} />
            <SocialIcon Icon={FaGithub} />
          </div>
        </motion.div>

        {/* JOB SEEKERS */}
        <FooterColumn title="Job Seekers">
          <FooterLink to="/jobs">Find Jobs</FooterLink>
          <FooterLink to="/companies">Companies</FooterLink>
          <FooterLink to="/saved-jobs">Saved Jobs</FooterLink>
          <FooterLink to="/profile">Profile</FooterLink>
        </FooterColumn>

        {/* EMPLOYERS */}
        <FooterColumn title="Employers">
          <FooterLink to="/post-job">Post a Job</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/dashboard">Dashboard</FooterLink>
          <FooterLink to="/hire">Hire Talent</FooterLink>
        </FooterColumn>

        {/* COMPANY */}
        <FooterColumn title="Company">
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms & Conditions</FooterLink>
        </FooterColumn>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 mt-12 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

/* ---------- Helper Components ---------- */

const FooterColumn = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h3 className="text-white font-semibold mb-4">{title}</h3>
    <div className="flex flex-col gap-3 text-sm">{children}</div>
  </motion.div>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="hover:text-blue-400 transition duration-200"
  >
    {children}
  </Link>
);

const SocialIcon = ({ Icon }) => (
  <motion.a
    whileHover={{ scale: 1.15 }}
    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition cursor-pointer"
  >
    <Icon size={14} />
  </motion.a>
);
