import { motion } from "framer-motion";

const blocks = [
  "bg-yellow-400",
  "bg-blue-600",
  "bg-pink-400",
  "bg-green-600",
  "bg-orange-500",
  "bg-indigo-600",
];

const Mosaic = () => {
  return (
    <div className="hidden lg:flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-4 gap-4 p-10"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`h-28 w-28 rounded-xl ${
              blocks[i % blocks.length]
            }`}
          />
        ))}
      </motion.div>

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-20 right-24 max-w-sm"
      >
        <h2 className="text-4xl font-bold leading-tight">
          Find the job
          <br />
          made for
          <br />
          you.
        </h2>
        <p className="text-gray-600 mt-4">
          Browse over 130k jobs at top companies and fast-growing startups.
        </p>
      </motion.div>
    </div>
  );
};

export default Mosaic;
