import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FloatingParticles } from '../components/FloatingParticles';
import { MusicToggle } from '../components/MusicToggle';
import { FLOWERS, FlowerType, CompletedSession } from '../types';
import { Pause, Play } from 'lucide-react';

const STORAGE_KEY = 'pomodoro-garden-sessions';

type TimerPhase = 'growing' | 'completed';

export function TimerScreen() {
  const navigate = useNavigate();
  const { flowerType } = useParams<{ flowerType: string }>();
  const [phase, setPhase] = useState<TimerPhase>('growing');
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const flower = FLOWERS.find((f) => f.type === flowerType);

  useEffect(() => {
    if (!flower) {
      navigate('/choose');
      return;
    }

    const seconds = flower.duration * 60;
    setTimeLeft(seconds);
    setTotalTime(seconds);
  }, [flower, navigate]);

  // Growing phase (timer)
  useEffect(() => {
    if (phase === 'growing' && !isPaused && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setPhase('completed');
            saveCompletedSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [phase, isPaused, timeLeft]);

  // Auto-navigate to garden after completion
  useEffect(() => {
    if (phase === 'completed') {
      const timer = setTimeout(() => {
        navigate('/garden');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase, navigate]);

  const saveCompletedSession = () => {
    const newSession: CompletedSession = {
      id: `${Date.now()}-${Math.random()}`,
      flowerType: flowerType as FlowerType,
      completedAt: new Date(),
    };

    const stored = localStorage.getItem(STORAGE_KEY);
    const sessions = stored ? JSON.parse(stored) : [];
    sessions.push(newSession);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  const getGrowthStage = () => {
    if (progress < 20) return 'seed';
    if (progress < 40) return 'sprout';
    if (progress < 60) return 'small-plant';
    if (progress < 80) return 'bud';
    return 'bloomed';
  };

  const stage = getGrowthStage();

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

  if (!flower) return null;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center overflow-hidden"
      style={{ fontFamily: 'Quicksand, sans-serif' }}
    >
      <FloatingParticles />
      <MusicToggle />

      <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-6 w-full">
        <AnimatePresence mode="wait">
          {/* Growing Phase (Timer + Flower Growth) */}
          {phase === 'growing' && (
            <motion.div
              key="growing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-8 bg-white/50 backdrop-blur-md rounded-3xl p-12 shadow-xl w-full max-w-2xl"
            >
              <div className="text-2xl font-semibold text-gray-700">
                Growing your {flower.name}...
              </div>

              {/* Flower Growth Visualization */}
              <div className="relative flex flex-col items-center justify-end h-80 w-full">
                {/* Soil */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 w-full h-20 rounded-t-3xl bg-gradient-to-b from-amber-800/60 to-amber-900/70" 
                />

                {/* Growing Plant */}
                <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20">
                  <AnimatePresence mode="wait">
                    {stage === 'seed' && (
                      <motion.div
                        key="seed"
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="text-5xl"
                      >
                        🌱
                      </motion.div>
                    )}

                    {stage === 'sprout' && (
                      <motion.div
                        key="sprout"
                        initial={{ y: 30, scale: 0.5, opacity: 0 }}
                        animate={{ 
                          y: 0, 
                          scale: 1, 
                          opacity: 1,
                        }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 150 }}
                        className="text-6xl"
                      >
                        🌱
                      </motion.div>
                    )}

                    {stage === 'small-plant' && (
                      <motion.div
                        key="small-plant"
                        initial={{ scale: 0.6, y: 30, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 150 }}
                        className="text-7xl"
                      >
                        🌿
                      </motion.div>
                    )}

                    {stage === 'bud' && (
                      <motion.div
                        key="bud"
                        initial={{ scale: 0.7, rotate: -10, opacity: 0 }}
                        animate={{
                          scale: 1,
                          rotate: 0,
                          opacity: 1,
                          y: [0, -8, 0],
                        }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{
                          scale: { type: 'spring', stiffness: 150 },
                          opacity: { duration: 0.3 },
                          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
                        }}
                        className="text-8xl"
                      >
                        🌿
                      </motion.div>
                    )}

                    {stage === 'bloomed' && (
                      <motion.div
                        key="bloomed"
                        initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                        animate={{
                          scale: 1,
                          rotate: 0,
                          opacity: 1,
                          y: [0, -10, 0],
                        }}
                        transition={{
                          scale: { type: 'spring', stiffness: 200, damping: 15 },
                          opacity: { duration: 0.5 },
                          y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                        }}
                        className="text-9xl"
                        style={{
                          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
                        }}
                      >
                        {getFlowerEmoji()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Progress indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-600 bg-white/90 px-4 py-2 rounded-full shadow-md"
                >
                  {stage === 'seed' && '🌱 Seed'}
                  {stage === 'sprout' && '🌱 Sprouting'}
                  {stage === 'small-plant' && '🌿 Growing'}
                  {stage === 'bud' && '🌿 Budding'}
                  {stage === 'bloomed' && `${getFlowerEmoji()} Blooming`}
                  {' '} • {Math.round(progress)}%
                </motion.div>
              </div>

              {/* Timer Display with Circle */}
              <div className="relative">
                <svg className="w-64 h-64 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    initial={{
                      strokeDashoffset: 2 * Math.PI * 45,
                    }}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100),
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-gray-800 tracking-wider">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              {/* Pause/Resume Button */}
              <motion.button
                onClick={() => setIsPaused(!isPaused)}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-300 to-orange-300 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPaused ? (
                  <>
                    <Play className="w-5 h-5" />
                    <span className="font-semibold">Resume</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-5 h-5" />
                    <span className="font-semibold">Pause</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Completion Phase */}
          {phase === 'completed' && (
            <motion.div
              key="completed"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-8 bg-white/50 backdrop-blur-md rounded-3xl p-12 shadow-xl"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.2, 1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-9xl"
              >
                {getFlowerEmoji()}
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-800">
                  Your {flower.name} has bloomed!
                </h2>
                <p className="text-xl text-gray-600">
                  Great work! Adding to your garden...
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-purple-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}