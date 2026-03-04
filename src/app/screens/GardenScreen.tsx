import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FloatingParticles } from '../components/FloatingParticles';
import { CompletedSession, FLOWERS } from '../types';
import { Sprout, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'pomodoro-garden-sessions';

export function GardenScreen() {
  const navigate = useNavigate();
  const [completedSessions, setCompletedSessions] = useState<CompletedSession[]>([]);
  const [showLatestFlower, setShowLatestFlower] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const sessions = JSON.parse(stored);
        setCompletedSessions(sessions);
      } catch (error) {
        console.error('Failed to load sessions:', error);
      }
    }
  }, []);

  const getFlowerEmoji = (flowerType: string) => {
    const flower = FLOWERS.find((f) => f.type === flowerType);
    return flower?.emoji || '🌸';
  };

  const latestSession = completedSessions[completedSessions.length - 1];
  const latestFlower = latestSession
    ? FLOWERS.find((f) => f.type === latestSession.flowerType)
    : null;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden"
      style={{ fontFamily: 'Quicksand, sans-serif' }}
    >
      <FloatingParticles />

      <div className="relative z-10 flex flex-col items-center px-6 py-12 gap-12">
        {/* Latest Flower Showcase */}
        {showLatestFlower && latestFlower && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 150 }}
            className="text-center space-y-6 bg-white/60 backdrop-blur-md rounded-3xl p-12 shadow-xl max-w-2xl"
          >
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <Sparkles className="w-6 h-6" />
              <span className="text-lg font-semibold uppercase tracking-wider">
                New Flower Added
              </span>
              <Sparkles className="w-6 h-6" />
            </div>

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-9xl"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
              }}
            >
              {latestFlower.emoji}
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-gray-800">{latestFlower.name}</h2>
              <p className="text-lg text-gray-600">
                {latestFlower.duration} minutes of focused work complete!
              </p>
            </div>

            <motion.button
              onClick={() => setShowLatestFlower(false)}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
              whileHover={{ scale: 1.05 }}
            >
              View full garden
            </motion.button>
          </motion.div>
        )}

        {/* Full Garden View */}
        {!showLatestFlower && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-3">
              <h1 className="text-5xl font-bold text-gray-800">Your Focus Garden</h1>
              <p className="text-lg text-gray-600">
                Every flower represents a moment of focus and growth
              </p>
            </div>

            {/* Garden Stats */}
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {completedSessions.length}
                </div>
                <div className="text-sm text-gray-600">
                  {completedSessions.length === 1 ? 'Flower' : 'Flowers'} Grown
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                <div className="text-3xl font-bold text-pink-600">
                  {Math.round(
                    completedSessions.reduce((total, session) => {
                      const flower = FLOWERS.find((f) => f.type === session.flowerType);
                      return total + (flower?.duration || 0);
                    }, 0) / 60
                  )}
                  h
                </div>
                <div className="text-sm text-gray-600">Total Focus Time</div>
              </div>
            </div>

            {/* Garden Grid */}
            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              {completedSessions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  Your garden is empty. Start growing flowers! 🌱
                </div>
              ) : (
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4">
                  {completedSessions.map((session, index) => {
                    const flower = FLOWERS.find((f) => f.type === session.flowerType);
                    return (
                      <motion.div
                        key={session.id}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          damping: 15,
                          delay: Math.min(index * 0.03, 1),
                        }}
                        className="flex items-center justify-center text-5xl hover:scale-125 transition-transform cursor-pointer"
                        title={`${flower?.name} - ${new Date(session.completedAt).toLocaleDateString()}`}
                        whileHover={{ y: -10 }}
                      >
                        {getFlowerEmoji(session.flowerType)}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Grow Again Button */}
        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/choose')}
          className="flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sprout className="w-6 h-6" />
          Grow Again
        </motion.button>
      </div>
    </div>
  );
}
