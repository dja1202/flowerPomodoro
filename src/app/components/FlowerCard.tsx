import { motion } from 'motion/react';
import { Flower } from '../types';

interface FlowerCardProps {
  flower: Flower;
  isSelected: boolean;
  onSelect: () => void;
}

export function FlowerCard({ flower, isSelected, onSelect }: FlowerCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      className={`
        relative flex flex-col items-center gap-3 p-6 rounded-3xl
        transition-all duration-300 cursor-pointer
        ${
          isSelected
            ? 'bg-white shadow-lg ring-4 ring-offset-2 scale-105'
            : 'bg-white/60 shadow-md hover:shadow-lg hover:scale-102'
        }
      `}
      style={{
        ringColor: isSelected ? flower.color : 'transparent',
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="text-5xl mb-1 transition-transform"
        style={{
          filter: isSelected ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' : 'none',
        }}
      >
        {flower.emoji}
      </div>
      <div className="text-center">
        <div className="font-semibold text-gray-800 mb-1">{flower.name}</div>
        <div className="text-sm text-gray-500">{flower.duration} minutes</div>
      </div>
    </motion.button>
  );
}
