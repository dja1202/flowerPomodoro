import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { flowers, FlowerType } from '../utils/flowerData';
import { FlowerSprite } from './FlowerSprite';

export function ChooseFlowerScreen() {
  const navigate = useNavigate();
  const [selectedFlower, setSelectedFlower] = useState<FlowerType | null>(null);

  const handleGrow = () => {
    if (selectedFlower) {
      navigate(`/grow?flower=${selectedFlower}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl mb-4 text-foreground" style={{ fontWeight: 600 }}>
          Choose Your Flower
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose a flower, start your timer, and watch it grow while you work.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {flowers.map((flower, index) => (
          <motion.button
            key={flower.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onClick={() => setSelectedFlower(flower.id)}
            className={`
              relative flex flex-col items-center p-6 rounded-3xl
              transition-all duration-300 cursor-pointer
              ${
                selectedFlower === flower.id
                  ? 'bg-white shadow-xl scale-105 ring-4 ring-primary/50'
                  : 'bg-white/80 shadow-md hover:shadow-lg hover:scale-102'
              }
            `}
          >
            <div className="mb-3">
              <FlowerSprite rowIndex={flower.rowIndex} stageIndex={6} size={100} />
            </div>
            <h3 className="text-lg mb-1" style={{ fontWeight: 600 }}>
              {flower.name}
            </h3>
            <p className="text-sm text-muted-foreground">{flower.description}</p>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGrow}
          disabled={!selectedFlower}
          className={`
            px-12 py-4 rounded-full text-lg transition-all duration-300
            ${
              selectedFlower
                ? 'bg-primary text-primary-foreground shadow-lg hover:shadow-xl'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }
          `}
          style={{ fontWeight: 600 }}
        >
          Grow
        </motion.button>
      </div>
    </motion.div>
  );
}
