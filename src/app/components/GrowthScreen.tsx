import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { FlowerSprite } from './FlowerSprite';
import { getFlowerById, saveCompletedFlower, FlowerType } from '../utils/flowerData';
import { Pause, Play, RotateCcw } from 'lucide-react';

const TOTAL_TIME = 25 * 60; // 25 minutes in seconds (standard Pomodoro)
// For demo purposes, you can reduce this: const TOTAL_TIME = 60; // 1 minute

export function GrowthScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const flowerId = searchParams.get('flower') as FlowerType;
  const flower = getFlowerById(flowerId);

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!flower) {
      navigate('/choose');
      return;
    }
  }, [flower, navigate]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          saveCompletedFlower(flowerId);
          setTimeout(() => navigate('/garden'), 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeLeft, flowerId, navigate]);

  if (!flower) return null;

  const progress = 1 - timeLeft / TOTAL_TIME;
  const currentStage = Math.min(Math.floor(progress * 7), 6);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleReset = () => {
    setTimeLeft(TOTAL_TIME);
    setIsPaused(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl"
    >
      <div className="flex flex-col items-center">
        <div className="mb-8 text-center">
          <h2 className="text-3xl mb-2 text-foreground" style={{ fontWeight: 600 }}>
            Growing {flower.name}
          </h2>
          <p className="text-muted-foreground">Stay focused and watch it bloom</p>
        </div>

        <motion.div
          key={currentStage}
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-12 bg-white rounded-full p-12 shadow-2xl"
        >
          <FlowerSprite rowIndex={flower.rowIndex} stageIndex={currentStage} size={200} />
        </motion.div>

        <div className="mb-8 text-center">
          <div className="text-7xl mb-4 tabular-nums" style={{ fontWeight: 600 }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="w-96 h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPaused(!isPaused)}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            style={{ fontWeight: 600 }}
          >
            {isPaused ? (
              <>
                <Play size={20} /> Resume
              </>
            ) : (
              <>
                <Pause size={20} /> Pause
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            style={{ fontWeight: 600 }}
          >
            <RotateCcw size={20} /> Reset
          </motion.button>
        </div>

        {isPaused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-muted-foreground"
          >
            Timer paused
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
