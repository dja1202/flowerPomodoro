import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  flowerName: string;
  onClose: () => void;
}

export function CompletionModal({ isOpen, flowerName, onClose }: CompletionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-10 shadow-2xl max-w-md mx-4 pointer-events-auto relative"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex flex-col items-center text-center gap-4">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                  className="text-7xl"
                >
                  🌸
                </motion.div>

                <div className="flex items-center gap-2 text-purple-600">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    Focus Complete
                  </span>
                  <Sparkles className="w-5 h-5" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Your {flowerName} has bloomed!
                  </h3>
                  <p className="text-gray-600">
                    Time for a well-deserved break. Your flower has been added to your garden.
                  </p>
                </div>

                <motion.button
                  onClick={onClose}
                  className="mt-4 px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Take a Break
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
