import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { FlowerSprite } from './FlowerSprite';
import { getGarden, getFlowerById } from '../utils/flowerData';
import { Sparkles } from 'lucide-react';

export function GardenScreen() {
  const navigate = useNavigate();
  const garden = getGarden();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Sparkles className="text-primary" size={32} />
          <h1 className="text-5xl text-foreground" style={{ fontWeight: 600 }}>
            Your Focus Garden
          </h1>
          <Sparkles className="text-primary" size={32} />
        </motion.div>
        <p className="text-muted-foreground text-lg">
          {garden.length === 0
            ? 'Your garden is waiting to bloom'
            : `You've grown ${garden.length} beautiful flower${garden.length > 1 ? 's' : ''}!`}
        </p>
      </div>

      {garden.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-20"
        >
          <p className="text-muted-foreground text-lg mb-8">
            Complete a focus session to grow your first flower
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {garden.map((completedFlower, index) => {
            const flower = getFlowerById(completedFlower.flowerId);
            if (!flower) return null;

            return (
              <motion.div
                key={`${completedFlower.flowerId}-${completedFlower.completedAt}`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-3">
                  <FlowerSprite rowIndex={flower.rowIndex} stageIndex={6} size={100} />
                </div>
                <h3 className="text-base mb-1" style={{ fontWeight: 600 }}>
                  {flower.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(completedFlower.completedAt).toLocaleDateString()}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/choose')}
          className="px-12 py-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ fontWeight: 600 }}
        >
          Grow Again
        </motion.button>
      </div>
    </motion.div>
  );
}
