import { motion, AnimatePresence } from "framer-motion";

export default function DialogBox({ open, type, title, message, onClose }) {
  if (!open) return null;

  const colors = {
    error: "text-red-500",
    success: "text-green-500",
    info: "text-indigo-500",
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, y: -30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 30 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[340px] shadow-2xl text-center"
        >
          <h2 className={`text-xl font-bold mb-2 ${colors[type]}`}>
            {title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-5">
            {message}
          </p>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            OK
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
