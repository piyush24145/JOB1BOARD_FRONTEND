import { motion } from "framer-motion";

const steps = ["Profile", "Preferences", "Culture","Resume/CV" ,"Done"];

const Stepper = ({ currentStep }) => {
  return (
    <div className="relative flex flex-col items-center mt-8 gap-4 w-full px-4 py-6 rounded-2xl">

      {/* 🌈 Full container animated background */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-0"
        style={{
          background: "linear-gradient(270deg, #E0F7FA, #FFF9C4, #E1F5FE, #D0F4DE)",
          backgroundSize: "600% 600%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "50% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* ✅ Content on top */}
      <div className="relative z-10 flex flex-col items-center gap-4 w-full">

        {/* Company / App Name */}
        <h1 className="text-2xl font-bold tracking-wide text-gray-800 z-10">
          JobBoard
        </h1>

        {/* Stepper */}
        <div className="w-full max-w-full overflow-x-auto">
          <div className="flex items-center bg-white bg-opacity-70 px-8 py-4 rounded-full shadow-md backdrop-blur-sm min-w-max justify-center">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;

              return (
                <div key={step} className="flex items-center flex-shrink-0">
                  {/* Step circle */}
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold
                    ${
                      isCompleted
                        ? "bg-green-300 text-white"
                        : isActive
                        ? "bg-blue-300 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>

                  {/* Step label */}
                  <span
                    className={`ml-2 text-sm font-medium
                    ${
                      isCompleted
                        ? "text-green-600"
                        : isActive
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>

                  {/* Connector line */}
                  {index !== steps.length - 1 && (
                    <div
                      className={`mx-4 h-[2px] w-10
                      ${isCompleted ? "bg-green-300" : "bg-gray-300"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Stepper;
