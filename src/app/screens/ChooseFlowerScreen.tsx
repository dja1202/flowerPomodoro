import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FloatingParticles } from '../components/FloatingParticles';
import { FlowerCard } from '../components/FlowerCard';
import { FLOWERS, FlowerType } from '../types';
import { Sprout } from 'lucide-react';

export function ChooseFlowerScreen() {
  const navigate = useNavigate();
  const [selectedFlower, setSelectedFlower] = useState<FlowerType>('daisy');

  const handleGrow = () => {
    navigate(`/timer/${selectedFlower}`);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center overflow-hidden"
      style={{ fontFamily: 'Quicksand, sans-serif' }}
    >
      <FloatingParticles />

      <div className="relative z-10 flex flex-col items-center px-6 py-12 gap-12 w-full max-w-6xl">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-2xl"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            Choose Your Flower
          </h1>
          <p className="text-lg text-gray-600">
            Choose a flower, start your timer, and watch it grow while you work.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {FLOWERS.map((flower, index) => (
            <motion.div
              key={flower.type}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.4 + index * 0.1,
                type: 'spring',
                stiffness: 200,
              }}
            >
              <FlowerCard
                flower={flower}
                isSelected={selectedFlower === flower.type}
                onSelect={() => setSelectedFlower(flower.type)}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onClick={handleGrow}
          className="flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sprout className="w-6 h-6" />
          Grow
        </motion.button>
      </div>
    </div>
  );
}
