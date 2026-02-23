import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";


const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Background blur */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Find Your <span className="text-blue-600">Perfect Job</span> <br />
            Match
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-xl">
            Search thousands of jobs from top companies and build your career
            with confidence.
          </p>

          {/* SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col md:flex-row items-stretch gap-3 bg-white rounded-xl shadow-xl p-3"
          >
            <div className="flex items-center gap-2 px-3 flex-1">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full outline-none text-gray-700"
              />
            </div>

            <div className="flex items-center gap-2 px-3 flex-1 border-t md:border-t-0 md:border-l">
              <MapPin className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none text-gray-700"
              />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-lg font-medium">
              Find Jobs
            </button>
          </motion.div>

          {/* POPULAR SEARCH */}
          <div className="mt-6 text-sm text-gray-500">
            Popular Searches:
            <span className="ml-2 text-gray-700">
              Designer, Developer, Web, IOS, PHP, Engineer
            </span>
          </div>
        </motion.div>

        {/* RIGHT FLOATING JOB CARDS */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col gap-6"
        >
          {[
            { title: "Product Sales Specialist", type: "Internship" },
            { title: "Junior Graphic Designer", type: "Full Time" },
            { title: "Finance Manager", type: "Urgent" },
          ].map((job, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold text-gray-800">
                  {job.title}
                </h4>
                <p className="text-sm text-gray-500">New York</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                {job.type}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
