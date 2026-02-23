import { motion } from "framer-motion";
import {
  FaAmazon,
  FaSlack,
  FaPaypal,
  FaSpotify,
  FaFigma,
} from "react-icons/fa";
import {
  MdAccountBalance,
  MdDesignServices,
  MdDeveloperMode,
  MdCampaign,
  MdHealthAndSafety,
  MdSupportAgent,
  MdCarRepair,
  MdManageAccounts,
} from "react-icons/md";

const companies = [
  <FaAmazon />,
  <FaSlack />,
  <FaPaypal />,
  <FaSpotify />,
  <FaAmazon />,
  <FaFigma />,
];

const categories = [
  {
    title: "Accounting / Finance",
    jobs: "1 open position",
    icon: <MdAccountBalance />,
  },
  {
    title: "Marketing",
    jobs: "5 open positions",
    icon: <MdCampaign />,
  },
  {
    title: "Design",
    jobs: "7 open positions",
    icon: <MdDesignServices />,
  },
  {
    title: "Development",
    jobs: "6 open positions",
    icon: <MdDeveloperMode />,
  },
  {
    title: "Project Management",
    jobs: "1 open position",
    icon: <MdManageAccounts />,
  },
  {
    title: "Customer Service",
    jobs: "4 open positions",
    icon: <MdSupportAgent />,
  },
  {
    title: "Health & Care",
    jobs: "3 open positions",
    icon: <MdHealthAndSafety />,
  },
  {
    title: "Automotive Jobs",
    jobs: "1 open position",
    icon: <MdCarRepair />,
  },
];

export default function JobCategoriesSection() {
  return (
    <section className="w-full py-20 bg-white">
      {/* 🔹 Companies Slider */}
      <div className="overflow-hidden mb-20">
        <motion.div
          className="flex gap-20 text-gray-400 text-5xl"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {[...companies, ...companies].map((Icon, i) => (
            <div key={i} className="min-w-max">
              {Icon}
            </div>
          ))}
        </motion.div>
      </div>

      {/* 🔹 Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold">Popular Job Categories</h2>
        <p className="text-gray-500 mt-2">
          2020 jobs live — 293 added today.
        </p>
      </div>

      {/* 🔹 Categories Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white border rounded-2xl p-8 text-center cursor-pointer shadow-sm hover:shadow-xl"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-3xl">
              {cat.icon}
            </div>
            <h3 className="font-semibold text-lg">{cat.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{cat.jobs}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
