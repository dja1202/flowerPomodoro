import { motion, AnimatePresence } from 'motion/react';
import { FlowerType } from '../types';

interface GrowingFlowerProps {
  flowerType: FlowerType;
  progress: number; // 0 to 100
  isCompleted: boolean;
}

export function GrowingFlower({ flowerType, progress, isCompleted }: GrowingFlowerProps) {
  // Determine growth stage based on progress
  const getStage = () => {
    if (progress === 0) return 'empty';
    if (progress < 20) return 'seed';
    if (progress < 40) return 'sprout';
    if (progress < 60) return 'small-plant';
    if (progress < 80) return 'bud';
    return 'bloomed';
  };

  const stage = getStage();

  // Get emoji for each stage
  const getFlowerEmoji = () => {
    switch (flowerType) {
      case 'daisy':
        return '🌼';
      case 'tulip':
        return '🌷';
      case 'sunflower':
        return '🌻';
      case 'rose':
        return '🌹';
      case 'lotus':
        return '🪷';
      default:
        return '🌸';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-end h-64 w-full">
      {/* Soil */}
      <motion.div
        className="absolute bottom-0 w-full h-16 rounded-t-3xl bg-gradient-to-b from-amber-800/60 to-amber-900/70"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: progress > 0 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Growing Plant Container */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16">
        <AnimatePresence mode="wait">
          {stage === 'empty' && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 text-sm"
            >
              Select a flower and start your timer
            </motion.div>
          )}

          {stage === 'seed' && (
            <motion.div
              key="seed"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-4xl"
            >
              🌱
            </motion.div>
          )}

          {stage === 'sprout' && (
            <motion.div
              key="sprout"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-5xl"
            >
              🌱
            </motion.div>
          )}

          {stage === 'small-plant' && (
            <motion.div
              key="small-plant"
              initial={{ scale: 0.5, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring' }}
              className="text-6xl"
            >
              🌿
            </motion.div>
          )}

          {stage === 'bud' && (
            <motion.div
              key="bud"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                y: [0, -5, 0],
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                scale: { type: 'spring' },
                y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
              }}
              className="text-7xl"
            >
              🌿
            </motion.div>
          )}

          {stage === 'bloomed' && (
            <motion.div
              key="bloomed"
              initial={{ scale: 0.5, rotate: -20 }}
              animate={{ 
                scale: isCompleted ? [1, 1.2, 1] : 1, 
                rotate: 0,
                y: isCompleted ? [0, -10, 0] : [0, -8, 0],
              }}
              transition={{ 
                scale: { duration: 1, times: [0, 0.5, 1] },
                y: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
              }}
              className="text-8xl"
              style={{
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
              }}
            >
              {getFlowerEmoji()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Growth progress indicator */}
      {progress > 0 && progress < 100 && (
        <motion.div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 bg-white/80 px-3 py-1 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Growing... {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  );
}
