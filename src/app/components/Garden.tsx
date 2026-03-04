import { motion } from 'motion/react';
import { CompletedSession } from '../types';
import { FLOWERS } from '../types';

interface GardenProps {
  completedSessions: CompletedSession[];
}

export function Garden({ completedSessions }: GardenProps) {
  if (completedSessions.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 text-center">
          <div className="text-gray-500 text-sm">
            Your garden is empty. Complete a focus session to plant your first flower! 🌱
          </div>
        </div>
      </div>
    );
  }

  const getFlowerEmoji = (flowerType: string) => {
    const flower = FLOWERS.find((f) => f.type === flowerType);
    return flower?.emoji || '🌸';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Focus Garden</h2>
          <div className="text-sm text-gray-600 bg-white/60 px-4 py-2 rounded-full">
            {completedSessions.length} {completedSessions.length === 1 ? 'flower' : 'flowers'} bloomed
          </div>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-3">
          {completedSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: index * 0.05,
              }}
              className="flex items-center justify-center text-4xl hover:scale-125 transition-transform cursor-pointer"
              title={`${FLOWERS.find((f) => f.type === session.flowerType)?.name} - ${new Date(session.completedAt).toLocaleDateString()}`}
            >
              {getFlowerEmoji(session.flowerType)}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
