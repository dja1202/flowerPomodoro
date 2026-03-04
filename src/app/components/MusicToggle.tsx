import { motion } from 'motion/react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export function MusicToggle() {
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  const toggleMusic = () => {
    setIsMusicEnabled(!isMusicEnabled);
    // Note: In a real implementation, this would control audio playback
    // For this demo, we're just toggling the state
  };

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed top-6 right-6 flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isMusicEnabled ? (
        <>
          <Volume2 className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">Lofi Playing</span>
        </>
      ) : (
        <>
          <VolumeX className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-500">Music Off</span>
        </>
      )}
    </motion.button>
  );
}
