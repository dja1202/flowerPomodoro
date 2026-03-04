import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { FloatingParticles } from '../components/FloatingParticles';

export function IntroScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-transition after 3 seconds
    const timer = setTimeout(() => {
      navigate('/choose');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center overflow-hidden"
      style={{ fontFamily: 'Quicksand, sans-serif' }}
    >
      <FloatingParticles />

      <div className="relative z-10 text-center space-y-8 px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-8xl mb-6"
          >
            🌸
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-800">
            Grow Your Focus Garden
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex justify-center gap-2 mt-8"
        >
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
        </motion.div>
      </div>
    </div>
  );
}
