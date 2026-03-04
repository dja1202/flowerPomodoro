import { motion } from 'motion/react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerControlsProps {
  timeLeft: number; // in seconds
  totalTime: number; // in seconds
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({
  timeLeft,
  totalTime,
  isRunning,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      {/* Timer Display */}
      <div className="relative">
        {/* Circular progress ring */}
        <svg className="w-64 h-64 -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
            animate={{ 
              strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100) 
            }}
            transition={{ duration: 0.5 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFB4D6" />
              <stop offset="50%" stopColor="#C9A0DC" />
              <stop offset="100%" stopColor="#A8D8EA" />
            </linearGradient>
          </defs>
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-bold text-gray-800 tracking-wider">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-4">
        {!isRunning ? (
          <motion.button
            onClick={onStart}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            <span className="font-semibold">Start</span>
          </motion.button>
        ) : (
          <motion.button
            onClick={onPause}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-300 to-orange-300 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Pause className="w-5 h-5" />
            <span className="font-semibold">Pause</span>
          </motion.button>
        )}

        <motion.button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-white/80 text-gray-700 rounded-full shadow-md hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5" />
          <span className="font-semibold">Reset</span>
        </motion.button>
      </div>
    </div>
  );
}
